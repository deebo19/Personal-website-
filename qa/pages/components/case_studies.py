from playwright.sync_api import Locator, Page


class CaseStudies:
    """Case studies with company filter buttons."""

    def __init__(self, page: Page):
        self.root = page.locator("#projects")
        self.filters = self.root.get_by_role("group", name="Filter case studies by company")
        self.count = self.root.locator(".case-count")

    @property
    def cards(self) -> Locator:
        return self.root.locator("article")

    def filter_button(self, company: str) -> Locator:
        return self.filters.get_by_role("button", name=company, exact=True)

    def filter_by(self, company: str) -> None:
        self.filter_button(company).click()

    def active_filter(self) -> str:
        return self.filters.locator("button[aria-pressed='true']").inner_text().strip()

    def tags(self) -> list[str]:
        # text_content: the tag is uppercased with CSS, inner_text would return the styled text
        return [t.strip() for t in self.cards.locator(".banner-tag").all_text_contents()]
