from playwright.sync_api import Locator

from pages.base_page import BasePage


class TestingPage(BasePage):
    """The 'How I test this site' page."""

    __test__ = False  # the name starts with "Test", so tell pytest this isn't a test class

    path = "/#/testing"

    @property
    def code_samples(self) -> Locator:
        return self.page.locator("pre code")

    @property
    def run_commands(self) -> Locator:
        return self.page.locator("#run-headless pre code")

    def back_to_home(self) -> None:
        self.page.get_by_role("link", name="Back to portfolio").click()
