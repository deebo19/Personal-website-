"""Recruiters find candidates through search engines, LinkedIn previews and ATS keyword matching."""
import re

import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage

# Terms recruiters search for in AI / QA engineering roles. Each must appear in *visible* text,
# because hidden keywords don't count with search engines (and can be penalised).
RECRUITER_KEYWORDS = [
    "QA Engineering Lead", "test automation", "test strategy", "quality engineering",
    "AI-driven", "agentic testing", "AI agents", "LLM", "Claude Code",
    "Playwright", "Selenium", "pytest", "Page Object Model", "Python", "CI/CD",
    "shift-left", "regression testing", "exploratory testing", "API testing",
    "performance testing", "accessibility", "release management", "UAT",
    "VR", "streaming", "mobile testing", "Agile", "ISTQB",
]


@pytest.mark.smoke
def test_title_and_description_carry_the_key_terms(home: HomePage):
    assert "AI QA Engineering Lead" in home.title
    assert "Test Automation" in home.title
    description = home.page.locator('meta[name="description"]').get_attribute("content")
    for term in ("QA Engineering Lead", "test automation", "Meta", "London", "AI-driven"):
        assert term.lower() in description.lower(), f"description is missing {term!r}"


@pytest.mark.regression
@pytest.mark.parametrize("keyword", RECRUITER_KEYWORDS)
def test_recruiter_keyword_is_visible_on_the_page(home: HomePage, keyword: str):
    text = home.page.locator("main").inner_text().lower()
    assert keyword.lower() in text, f"'{keyword}' is not visible anywhere on the page"


@pytest.mark.regression
def test_social_preview_is_complete_and_image_loads(home: HomePage, base_url: str):
    head = home.page.locator("head")
    for prop in ("og:title", "og:description", "og:url", "og:image"):
        expect(head.locator(f'meta[property="{prop}"]')).to_have_count(1)
    expect(head.locator('meta[name="twitter:card"]')).to_have_attribute("content", "summary_large_image")
    canonical = head.locator('link[rel="canonical"]').get_attribute("href")
    assert canonical.startswith("https://") and canonical.endswith("/")
    assert home.page.request.get(f"{base_url}/og-image.jpg").ok, "social preview image is missing"


@pytest.mark.regression
def test_structured_data_lists_skills_and_credentials(home: HomePage):
    data = home.structured_data()
    for skill in ("Agentic testing", "Test automation", "Playwright", "QA leadership"):
        assert skill in data["knowsAbout"]
    assert data["hasCredential"]["name"].startswith("ISTQB")


@pytest.mark.regression
def test_robots_and_sitemap_are_published(home: HomePage, base_url: str):
    robots = home.page.request.get(f"{base_url}/robots.txt")
    assert robots.ok and "Sitemap:" in robots.text()
    sitemap = home.page.request.get(f"{base_url}/sitemap.xml")
    assert sitemap.ok and "<loc>https://" in sitemap.text()


# What a crawler gets *before* any JavaScript runs (Bing, link previews, AI search crawlers).
@pytest.mark.smoke
def test_raw_html_already_contains_the_page_content(home: HomePage, base_url: str):
    raw = home.page.request.get(f"{base_url}/").text()
    assert "data-prerendered" in raw, "the build was not prerendered"
    assert re.search(r"<h1[^>]*>[^<]*Adeeb Hussain", raw), "name is not in the raw <h1>"
    for text in ("AI QA Engineering Lead", "Selfridges", "Channel 4", "Playwright", "test automation"):
        assert text in raw, f"{text!r} is missing from the raw HTML"


@pytest.mark.regression
def test_structured_data_is_a_profile_page_about_me(home: HomePage):
    data = home.profile_page_data()
    assert data["@type"] == "ProfilePage"
    assert data["mainEntity"]["@type"] == "Person"
    assert data["mainEntity"]["givenName"] == "Adeeb"
    assert data["mainEntity"]["familyName"] == "Hussain"


@pytest.mark.regression
def test_snapshot_is_replaced_by_the_live_app_without_duplicates(home: HomePage):
    expect(home.page.locator("h1", has_text="Adeeb Hussain")).to_have_count(1)
    expect(home.page.locator("#root .main-container")).to_have_count(1)


@pytest.mark.regression
def test_testing_page_link_never_shows_the_home_snapshot(page, base_url: str):
    page.goto(f"{base_url}/#/testing", wait_until="domcontentloaded")
    expect(page.locator("#root h1", has_text="Adeeb Hussain")).to_have_count(0)
