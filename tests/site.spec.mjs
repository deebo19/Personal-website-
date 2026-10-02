import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("page has a title and a single main heading", async ({ page }) => {
  await expect(page).toHaveTitle(/Adeeb Hussain.*QA/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Adeeb Hussain");
});

test("avatar is shown in the hero", async ({ page }) => {
  const avatar = page.getByRole("img", { name: "Adeeb's 3D avatar", exact: true });
  await expect(avatar).toBeVisible();
  expect(await avatar.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("Meta HQ photo with avatar is shown", async ({ page }) => {
  const photo = page.getByRole("img", { name: /Meta sign at 1 Hacker Way/ });
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toBeVisible();
  await expect.poll(() => photo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
});

test("every lifecycle stage is shown, in order", async ({ page }) => {
  const stages = page.locator(".lifecycle .stage-num");
  await expect(stages).toHaveCount(8);
  await expect(stages).toHaveText(["01", "02", "03", "04", "05", "06", "07", "08"]);
});

test("all case studies and roles are listed", async ({ page }) => {
  await expect(page.locator("#projects article")).toHaveCount(7);
  await expect(page.locator("#history .vertical-timeline-element--work")).toHaveCount(7);
});

test("nav links point to sections that exist", async ({ page }) => {
  const hrefs = await page.locator("#navigation a[href^='#'], .MuiDrawer-root a[href^='#']")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of new Set(hrefs)) {
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

test("theme toggle switches between dark and light", async ({ page }) => {
  const container = page.locator(".main-container");
  await expect(container).toHaveClass(/dark-mode/);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(container).toHaveClass(/light-mode/);
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(container).toHaveClass(/dark-mode/);
});

test("mobile menu opens and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  const link = page.locator(".MuiDrawer-paper").getByRole("link", { name: "History" });
  await expect(link).toBeVisible();
  await link.click();
  await expect(link).toBeHidden();
  await expect(page).toHaveURL(/#history$/);
});

test("contact buttons reach me by email and LinkedIn", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
  await expect(page.locator("#contact").getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin\.com\/in\/adeebhussain/);
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
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

for (const mode of ["dark", "light"]) {
  test(`no accessibility violations (${mode} mode)`, async ({ page }) => {
    if (mode === "light") await page.getByRole("button", { name: "Switch to light mode" }).click();
    // Let the fade-in finish so contrast is measured on final colours
    await page.waitForTimeout(1500);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length}) e.g. ${v.nodes[0].target}`)).toEqual([]);
  });
}
