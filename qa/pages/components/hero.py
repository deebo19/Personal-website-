from dataclasses import dataclass

from playwright.sync_api import Locator, Page


@dataclass
class CompanyCard:
    company: str
    figure: str
    label: str
    source: str


class Hero:
    """Top of the home page: name, title, tagline, company cards and the two figures."""

    def __init__(self, page: Page):
        self.page = page
        self.root = page.locator("#top")
        self.job_title = self.root.locator(".job-title")
        self.tagline = self.root.locator(".tagline")
        self.photo_of_me = self.root.get_by_role("img", name="Adeeb Hussain", exact=True)
        self.avatar = self.root.get_by_role("img", name="Adeeb's 3D avatar", exact=True)

    @property
    def cards(self) -> Locator:
        return self.root.locator(".company-stats li")

    def company_cards(self) -> list[CompanyCard]:
        return [
            CompanyCard(
                company=card.locator(".company-name").inner_text().strip(),
                figure=card.locator(".stat-num").inner_text().strip(),
                label=card.locator(".stat-label").inner_text().strip(),
                source=card.locator("a.stat-source").get_attribute("href") or "",
            )
            for card in self.cards.all()
        ]

    @staticmethod
    def image_loaded(img: Locator) -> bool:
        return img.evaluate("i => i.complete && i.naturalWidth > 0")
