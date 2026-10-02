from playwright.sync_api import Page


class Contact:
    """Contact section: email, LinkedIn, copy email and 'Save CV as PDF'."""

    def __init__(self, page: Page):
        self.page = page
        self.root = page.locator("#contact")
        self.email_button = self.root.get_by_role("link", name="Email me")
        self.linkedin = self.root.get_by_role("link", name="LinkedIn")
        self.copy_email_button = self.root.get_by_role("button", name="Copy email")
        self.save_pdf_button = self.root.get_by_role("button", name="Save CV as PDF")
        self.hint = self.root.locator(".contact-hint")
        self.print_details = self.root.locator(".print-only")

    def copy_email(self) -> str:
        self.copy_email_button.click()
        return self.page.evaluate("navigator.clipboard.readText()")
