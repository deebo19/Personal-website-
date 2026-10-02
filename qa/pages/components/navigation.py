import re

from playwright.sync_api import Locator, Page


class Navigation:
    """Top bar: section links, theme toggle and the mobile menu."""

    def __init__(self, page: Page):
        self.page = page
        self.bar = page.locator("#navigation")
        self.menu_button = page.get_by_role("button", name="Open menu")
        self.drawer = page.locator(".MuiDrawer-paper")

    def link(self, name: str) -> Locator:
        return self.bar.get_by_role("link", name=name, exact=True)

    def section_hrefs(self) -> list[str]:
        hrefs = self.bar.locator("a[href^='#']").evaluate_all("as => as.map(a => a.getAttribute('href'))")
        return [h for h in hrefs if not h.startswith("#/")]

    def go_to(self, name: str) -> None:
        self.link(name).click()

    # Theme
    def theme_toggle(self) -> Locator:
        return self.page.get_by_role("button", name=re.compile(r"Switch to (light|dark) mode"))

    def current_theme(self) -> str:
        classes = self.page.locator(".main-container").get_attribute("class") or ""
        return "dark" if "dark-mode" in classes else "light"

    def toggle_theme(self) -> str:
        self.theme_toggle().click()
        return self.current_theme()

    # Mobile
    def open_mobile_menu(self) -> None:
        self.menu_button.click()

    def mobile_link(self, name: str) -> Locator:
        return self.drawer.get_by_role("link", name=name, exact=True)
