import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage
from pages.testing_page import TestingPage


@pytest.mark.smoke
def test_every_nav_link_points_to_a_real_section(home: HomePage):
    hrefs = home.nav.section_hrefs()
    assert hrefs, "navigation has no section links"
    for href in hrefs:
        expect(home.page.locator(href)).to_have_count(1)


@pytest.mark.regression
@pytest.mark.parametrize("link, section", [("Expertise", "expertise"), ("Case Studies", "projects"),
                                           ("History", "history"), ("Contact", "contact")])
def test_nav_link_scrolls_to_its_section(home: HomePage, link: str, section: str):
    home.nav.go_to(link)
    expect(home.section(section)).to_be_in_viewport()


@pytest.mark.regression
def test_how_i_test_link_opens_the_testing_page(home: HomePage, base_url: str):
    home.nav.go_to("How I Test")
    testing = TestingPage(home.page, base_url)
    testing.wait_until_ready()
    expect(testing.main_heading).to_contain_text("How I test this site")


@pytest.mark.mobile
def test_mobile_menu_navigates_and_closes(mobile_page, base_url: str):
    home = HomePage(mobile_page, base_url).open()
    home.nav.open_mobile_menu()
    link = home.nav.mobile_link("History")
    expect(link).to_be_visible()
    link.click()
    expect(link).to_be_hidden()
    expect(home.section("history")).to_be_in_viewport()


@pytest.mark.mobile
@pytest.mark.parametrize("section", ["feedback", "contact", "history"])
def test_page_always_opens_at_the_top_even_with_a_section_in_the_link(mobile_page, base_url: str, section: str):
    """Tapping a menu item leaves #section in the address; reopening or sharing that link
    used to jump straight to that section instead of the top of the portfolio."""
    mobile_page.goto(f"{base_url}/#{section}")
    HomePage(mobile_page, base_url).wait_until_ready()
    mobile_page.wait_for_timeout(500)
    assert mobile_page.evaluate("window.scrollY") == 0
    assert mobile_page.evaluate("location.hash") == ""


@pytest.mark.mobile
def test_reload_after_scrolling_returns_to_the_top(mobile_page, base_url: str):
    home = HomePage(mobile_page, base_url).open()
    home.section("contact").scroll_into_view_if_needed()
    mobile_page.reload()
    home.wait_until_ready()
    mobile_page.wait_for_timeout(500)
    assert mobile_page.evaluate("window.scrollY") == 0


@pytest.mark.mobile
def test_menu_links_still_scroll_after_opening_at_the_top(mobile_page, base_url: str):
    home = HomePage(mobile_page, base_url).open()
    home.nav.open_mobile_menu()
    home.nav.mobile_link("Contact").click()
    expect(home.section("contact")).to_be_in_viewport()


@pytest.mark.mobile
def test_back_to_top_button_works_on_mobile(mobile_page, base_url: str):
    home = HomePage(mobile_page, base_url).open()
    home.section("contact").scroll_into_view_if_needed()
    expect(home.back_to_top).to_be_visible()
    box = home.back_to_top.bounding_box()
    assert box["y"] + box["height"] <= mobile_page.viewport_size["height"], "button is off-screen"
    home.back_to_top.click()
    mobile_page.wait_for_function("window.scrollY < 50")
