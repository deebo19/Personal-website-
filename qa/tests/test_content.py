import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage


@pytest.mark.regression
def test_all_case_studies_are_listed(home: HomePage):
    expect(home.case_studies).to_have_count(7)


@pytest.mark.regression
def test_career_history_lists_every_role_newest_first(home: HomePage):
    expect(home.timeline.roles).to_have_count(7)
    companies = home.timeline.companies()
    assert companies[0] == "Meta" and companies[-1] == "Sparta Global"


@pytest.mark.regression
def test_approach_has_eight_stages_in_order(home: HomePage):
    expect(home.approach_stages).to_have_text([f"{i:02d}" for i in range(1, 9)])


@pytest.mark.smoke
def test_recruiters_can_reach_me(home: HomePage):
    expect(home.email_button).to_have_attribute("href", "mailto:adeebhussain2@hotmail.com")
    expect(home.contact_linkedin).to_have_attribute("href", "https://www.linkedin.com/in/adeebhussain/")
