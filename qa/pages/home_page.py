import json

from playwright.sync_api import Locator

from pages.base_page import BasePage
from pages.components.case_studies import CaseStudies
from pages.components.contact import Contact
from pages.components.feedback_form import FeedbackForm
from pages.components.hero import Hero
from pages.components.highlights import Highlights
from pages.components.timeline import Timeline


class HomePage(BasePage):
    path = "/"

    def __init__(self, page, base_url):
        super().__init__(page, base_url)
        self.hero = Hero(page)
        self.highlights = Highlights(page)
        self.case_studies = CaseStudies(page)
        self.timeline = Timeline(page)
        self.contact = Contact(page)
        self.feedback = FeedbackForm(page)
        self.back_to_top = page.get_by_role("button", name="Back to top")

    def section(self, section_id: str) -> Locator:
        return self.page.locator(f"#{section_id}")

    @property
    def approach_stages(self) -> Locator:
        return self.page.locator(".lifecycle .stage-num")

    def profile_page_data(self) -> dict:
        """The schema.org ProfilePage JSON-LD that search engines read."""
        return json.loads(self.page.locator('script[type="application/ld+json"]').text_content())

    def structured_data(self) -> dict:
        """The Person the profile page is about."""
        return self.profile_page_data()["mainEntity"]

    def local_asset_urls(self) -> list[str]:
        """Every same-origin link, stylesheet, script and image on the page."""
        return self.page.evaluate(
            """() => [...new Set(
                [...document.querySelectorAll('a[href], link[href], script[src], img[src]')]
                  .map(el => (el.href || el.src).split('#')[0])
                  .filter(u => u.startsWith(location.origin))
            )]"""
        )
