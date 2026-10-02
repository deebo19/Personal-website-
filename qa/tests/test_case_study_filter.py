import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage


@pytest.mark.regression
@pytest.mark.parametrize("company, expected", [("Meta", 2), ("Discovery+", 1), ("Selfridges", 1), ("Channel 4", 3)])
def test_filter_shows_only_that_companys_case_studies(home: HomePage, company: str, expected: int):
    studies = home.case_studies
    studies.filter_by(company)
    expect(studies.cards).to_have_count(expected)
    assert all(tag.startswith(company) for tag in studies.tags())
    assert studies.active_filter() == company
    expect(studies.count).to_have_text(f"Showing {expected} of 7")


@pytest.mark.regression
def test_all_restores_every_case_study(home: HomePage):
    studies = home.case_studies
    studies.filter_by("Channel 4")
    studies.filter_by("All")
    expect(studies.cards).to_have_count(7)
    expect(studies.filter_button("All")).to_have_attribute("aria-pressed", "true")
