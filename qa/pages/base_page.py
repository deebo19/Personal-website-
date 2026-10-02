from playwright.sync_api import Page, expect

from pages.components.navigation import Navigation


class BasePage:
    """Behaviour every page shares: opening it, its title and the site navigation."""

    path = "/"

    def __init__(self, page: Page, base_url: str):
        self.page = page
        self.base_url = base_url
        self.nav = Navigation(page)

    def open(self):
        self.page.goto(self.base_url + self.path)
        self.wait_until_ready()
        return self

    def wait_until_ready(self) -> None:
        expect(self.page.get_by_role("heading", level=1)).to_be_visible()

    @property
    def title(self) -> str:
        return self.page.title()

    @property
    def main_heading(self):
        return self.page.get_by_role("heading", level=1)
