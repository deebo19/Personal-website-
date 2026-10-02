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
