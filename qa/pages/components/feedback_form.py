from urllib.parse import parse_qs, unquote, urlparse

from playwright.sync_api import Locator, Page


class FeedbackForm:
    """Feedback form: star rating, message, optional name/email, then a ready-to-send panel."""

    def __init__(self, page: Page):
        self.page = page
        self.root = page.locator("#feedback")
        self.message = self.root.get_by_label("Your feedback")
        self.name = self.root.get_by_label("Name (optional)")
        self.email = self.root.get_by_label("Email (optional)")
        self.submit_button = self.root.get_by_role("button", name="Prepare feedback")
        self.ready_panel = self.root.get_by_role("status")
        self.email_app_link = self.root.get_by_role("link", name="Open in email app")
        self.copy_button = self.root.get_by_role("button", name="Copy feedback")
        self.write_another_button = self.root.get_by_role("button", name="Write another")

    def rate(self, stars: int) -> None:
        self.root.get_by_role("radio", name=f"{stars} –").check()

    def fill(self, stars: int | None = None, message: str = "", name: str = "", email: str = ""):
        if stars:
            self.rate(stars)
        self.message.fill(message)
        self.name.fill(name)
        self.email.fill(email)
        return self

    def submit(self) -> None:
        self.submit_button.click()

    def error(self, field: str) -> Locator:
        return self.root.locator(f"#{field}-error")

    def errors(self) -> dict[str, str]:
        return {
            field: self.error(field).inner_text()
            for field in ("rating", "message", "email")
            if self.error(field).count()
        }

    def prepared_email(self) -> dict[str, str]:
        """Decode the mailto: link the form prepared."""
        url = urlparse(self.email_app_link.get_attribute("href") or "")
        query = parse_qs(url.query)
        return {
            "to": unquote(url.path),
            "subject": query.get("subject", [""])[0],
            "body": query.get("body", [""])[0],
        }
