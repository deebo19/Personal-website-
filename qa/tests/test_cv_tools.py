import pytest
from playwright.sync_api import Page, expect

from pages.home_page import HomePage


@pytest.mark.regression
def test_copy_email_puts_my_address_on_the_clipboard(home: HomePage, base_url: str):
    home.page.context.grant_permissions(["clipboard-read", "clipboard-write"], origin=base_url)
    assert home.contact.copy_email() == "adeebhussain2@hotmail.com"
    expect(home.contact.root.get_by_role("button", name="Email copied!")).to_be_visible()


@pytest.mark.regression
def test_save_as_pdf_opens_the_print_dialog(home: HomePage):
    # Wrap in a function: a bare string whose value is a function would be *called* by evaluate()
    home.page.evaluate("() => { window.__printed = 0; window.print = () => { window.__printed++; }; }")
    home.contact.save_pdf_button.click()
    assert home.page.evaluate("window.__printed") == 1


@pytest.mark.regression
def test_print_layout_is_a_clean_cv(home: HomePage):
    home.case_studies.filter_by("Meta")
    home.page.evaluate("window.dispatchEvent(new Event('beforeprint'))")
    home.page.emulate_media(media="print")
    for hidden in ("#navigation", "#highlights", "#feedback", ".case-filter"):
        expect(home.page.locator(hidden)).to_be_hidden()
    expect(home.contact.print_details).to_be_visible()
    expect(home.contact.print_details).to_contain_text("adeebhussain2@hotmail.com")
    expect(home.case_studies.cards).to_have_count(7)  # printing resets the filter
    for role in home.timeline.roles.all():
        expect(role.locator(".vertical-timeline-element-content")).to_be_visible()


@pytest.mark.regression
def test_pdf_export_produces_a_short_cv(home: HomePage):
    home.page.emulate_media(media="print")
    pdf = home.page.pdf(format="A4", print_background=True)
    pages = pdf.count(b"/Type /Page") - pdf.count(b"/Type /Pages")
    assert 3 <= pages <= 8, f"CV PDF should be a few pages, got {pages}"


@pytest.mark.regression
def test_theme_choice_is_remembered(page: Page, base_url: str):
    home = HomePage(page, base_url).open()
    assert home.nav.toggle_theme() == "light"
    page.reload()
    home.wait_until_ready()
    assert home.nav.current_theme() == "light"


@pytest.mark.regression
def test_back_to_top_appears_after_scrolling_and_works(home: HomePage):
    expect(home.back_to_top).to_have_count(0)
    home.section("contact").scroll_into_view_if_needed()
    expect(home.back_to_top).to_be_visible()
    home.back_to_top.click()
    home.page.wait_for_function("window.scrollY < 50")
    expect(home.back_to_top).to_have_count(0)


@pytest.mark.smoke
def test_structured_data_describes_me_for_search_engines(home: HomePage):
    data = home.structured_data()
    assert data["@type"] == "Person"
    assert data["name"] == "Adeeb Hussain"
    assert data["worksFor"]["name"] == "Meta"
    assert "https://www.linkedin.com/in/adeebhussain/" in data["sameAs"]
