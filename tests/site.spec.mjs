import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("page has a title and main heading", async ({ page }) => {
  await expect(page).toHaveTitle(/Adeeb Hussain.*QA/);
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

test("no accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test("avatar is shown in the hero", async ({ page }) => {
  const avatar = page.getByRole("img", { name: /avatar/i });
  await expect(avatar).toBeVisible();
  expect(await avatar.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("space scene renders", async ({ page }) => {
  await expect.poll(() =>
    page.evaluate(() => {
      const c = document.getElementById("space");
      const data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data;
      let lit = 0;
      for (let i = 3; i < data.length; i += 4 * 97) if (data[i] > 0) lit++;
      return lit;
    })
  ).toBeGreaterThan(20);
});

test("scene responds to the mouse", async ({ page, isMobile }) => {
  test.skip(isMobile, "pointer tracking is desktop only");
  const mx = () => page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--mx")));
  const size = page.viewportSize();
  await page.mouse.move(size.width - 5, size.height / 2);
  await expect.poll(mx).toBeGreaterThan(0.5);
  await page.mouse.move(5, size.height / 2);
  await expect.poll(mx).toBeLessThan(-0.5);
});
