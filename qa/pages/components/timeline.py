from playwright.sync_api import Locator, Page


class Timeline:
    """Career History: one entry per role, then education."""

    def __init__(self, page: Page):
        self.root = page.locator("#history")

    @property
    def roles(self) -> Locator:
        return self.root.locator(".vertical-timeline-element--work")

    # text_content, not inner_text: entries further down stay hidden until scrolled into view,
    # and inner_text only returns visible text.
    def role_titles(self) -> list[str]:
        return [t.strip() for t in self.roles.locator(".vertical-timeline-element-title").all_text_contents()]

    def companies(self) -> list[str]:
        return [c.strip() for c in self.roles.locator(".company").all_text_contents()]
