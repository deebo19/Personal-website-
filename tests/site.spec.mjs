import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page has a title and main heading", async ({ page }) => {
  await expect(page).toHaveTitle(/QA Lead/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("every lifecycle stage is shown, in order", async ({ page }) => {
  const stages = page.locator(".lifecycle .stage-num");
  await expect(stages).toHaveCount(8);
  await expect(stages).toHaveText(["01", "02", "03", "04", "05", "06", "07", "08"]);
});

test("nav links point to sections that exist", async ({ page }) => {
  const hrefs = await page.locator(".nav-links a[href^='#']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    await expect(page.locator(href), `section ${href}`).toHaveCount(1);
  }
});

test("local links and assets do not 404", async ({ page, request }) => {
  const urls = await page.evaluate(() =>
    [...document.querySelectorAll("a[href], link[href], script[src], img[src]")]
      .map((el) => el.href || el.src)
      .filter((u) => u.startsWith(location.origin))
      .map((u) => u.split("#")[0])
  );
  for (const url of new Set(urls)) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
  }
});

test("theme toggle switches between light and dark", async ({ page }) => {
  const html = page.locator("html");
  const toggle = page.locator(".theme-toggle");
  if (await page.locator(".nav-toggle").isVisible()) await page.locator(".nav-toggle").click();
  await toggle.click();
  const first = await html.getAttribute("data-theme");
  expect(["light", "dark"]).toContain(first);
  await toggle.click();
  await expect(html).not.toHaveAttribute("data-theme", first);
});

test("mobile menu opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  const toggle = page.locator(".nav-toggle");
  const links = page.locator("#nav-links");
  await expect(links).toBeHidden();
  await toggle.click();
  await expect(links).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await links.getByRole("link", { name: "Experience" }).click();
  await expect(links).toBeHidden();
});

test("no horizontal scroll", async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("no console errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.reload();
  expect(errors).toEqual([]);
});

for (const theme of ["light", "dark"]) {
  test(`no accessibility violations (${theme})`, async ({ page }) => {
    await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}
