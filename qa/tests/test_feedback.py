import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage


@pytest.mark.regression
def test_empty_form_shows_errors_and_focuses_the_first_problem(home: HomePage):
    form = home.feedback
    form.submit()
    assert form.errors() == {
        "rating": "Please choose a rating.",
        "message": "Please write at least 10 characters.",
    }
    expect(form.root.get_by_role("radio", name="1 –")).to_be_focused()
    expect(form.ready_panel).to_have_count(0)


@pytest.mark.regression
@pytest.mark.parametrize("message", ["", "too short", "         "])
def test_message_needs_at_least_10_real_characters(home: HomePage, message: str):
    home.feedback.fill(stars=4, message=message)
    home.feedback.submit()
    assert home.feedback.errors() == {"message": "Please write at least 10 characters."}
    expect(home.feedback.message).to_have_attribute("aria-invalid", "true")


@pytest.mark.regression
@pytest.mark.parametrize("email", ["not-an-email", "me@", "me@site", "a b@c.com"])
def test_invalid_email_is_rejected(home: HomePage, email: str):
    home.feedback.fill(stars=5, message="Great site, really clear.", email=email)
    home.feedback.submit()
    assert home.feedback.errors() == {"email": "That email address doesn't look right."}


@pytest.mark.smoke
def test_valid_feedback_prepares_an_email_to_me(home: HomePage):
    form = home.feedback
    form.fill(stars=4, message="Love the VR theme!", name="Sam Recruiter", email="sam@example.com")
    form.submit()
    expect(form.ready_panel).to_contain_text("Your feedback is ready to send")
    mail = form.prepared_email()
    assert mail["to"] == "adeebhussain2@hotmail.com"
    assert mail["subject"] == "Portfolio feedback (4/5)"
    assert "Rating: 4/5 (Great)" in mail["body"]
    assert "Love the VR theme!" in mail["body"]
    assert "From: Sam Recruiter <sam@example.com>" in mail["body"]


@pytest.mark.regression
def test_name_and_email_are_optional(home: HomePage):
    home.feedback.fill(stars=3, message="Nice work on the timeline.")
    home.feedback.submit()
    assert "From: Anonymous" in home.feedback.prepared_email()["body"]


@pytest.mark.regression
def test_feedback_can_be_copied(home: HomePage, base_url: str):
    home.page.context.grant_permissions(["clipboard-read", "clipboard-write"], origin=base_url)
    home.feedback.fill(stars=5, message="Copy me to the clipboard please.")
    home.feedback.submit()
    home.feedback.copy_button.click()
    expect(home.feedback.root.get_by_role("button", name="Copied!")).to_be_visible()
    assert "Copy me to the clipboard please." in home.page.evaluate("navigator.clipboard.readText()")


@pytest.mark.regression
def test_write_another_resets_the_form(home: HomePage):
    home.feedback.fill(stars=2, message="First piece of feedback.")
    home.feedback.submit()
    home.feedback.write_another_button.click()
    expect(home.feedback.message).to_have_value("")
    expect(home.feedback.root.get_by_role("radio", name="2 –")).not_to_be_checked()
