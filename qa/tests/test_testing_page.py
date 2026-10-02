import pytest
from playwright.sync_api import expect

from pages.testing_page import TestingPage


@pytest.mark.regression
def test_testing_page_shows_framework_code_and_run_commands(testing_page: TestingPage):
    expect(testing_page.main_heading).to_contain_text("How I test this site")
    assert testing_page.code_samples.count() >= 4
    expect(testing_page.run_commands.first).to_contain_text("pytest")


@pytest.mark.regression
def test_back_link_returns_to_portfolio(testing_page: TestingPage):
    testing_page.back_to_home()
    expect(testing_page.main_heading).to_have_text("Adeeb Hussain")
