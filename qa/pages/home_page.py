from playwright.sync_api import Locator

from pages.base_page import BasePage
from pages.components.hero import Hero
from pages.components.timeline import Timeline


class HomePage(BasePage):
    path = "/"

    def __init__(self, page, base_url):
        super().__init__(page, base_url)
        self.hero = Hero(page)
        self.timeline = Timeline(page)

    def section(self, section_id: str) -> Locator:
        return self.page.locator(f"#{section_id}")

    @property
    def case_studies(self) -> Locator:
        return self.page.locator("#projects article")

    @property
    def approach_stages(self) -> Locator:
        return self.page.locator(".lifecycle .stage-num")

    @property
    def email_button(self) -> Locator:
        return self.page.get_by_role("link", name="Email me")

    @property
    def contact_linkedin(self) -> Locator:
        return self.section("contact").get_by_role("link", name="LinkedIn")

    def local_asset_urls(self) -> list[str]:
        """Every same-origin link, stylesheet, script and image on the page."""
        return self.page.evaluate(
            """() => [...new Set(
                [...document.querySelectorAll('a[href], link[href], script[src], img[src]')]
                  .map(el => (el.href || el.src).split('#')[0])
                  .filter(u => u.startsWith(location.origin))
            )]"""
        )
