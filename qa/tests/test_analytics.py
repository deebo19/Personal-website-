"""Visit and click tracking (GoatCounter).

The real script is never loaded: it is replaced by a stub that records every call, so the tests
check exactly what the site would send without counting test runs on the live dashboard.
"""
import pytest
from playwright.sync_api import Page

from pages.components.navigation import Navigation
from pages.home_page import HomePage

SCRIPT = "https://gc.zgo.at/count.js"
STUB = "window.goatcounter = { count: (v) => (window.__gc = window.__gc || []).push(v) };"


def sent(page: Page) -> list[dict]:
    return page.evaluate("() => window.__gc || []")


@pytest.fixture
def tracked_home(page: Page, base_url: str) -> HomePage:
    page.add_init_script("localStorage.setItem('analytics-test', '1')")
    hits: list[str] = []

    def fulfil(route):
        hits.append(route.request.url)
        route.fulfill(status=200, content_type="application/javascript", body=STUB)

    page.route(SCRIPT, fulfil)
    home = HomePage(page, base_url).open()
    page.wait_for_load_state("networkidle")
    if not hits:
        pytest.skip("Analytics is not configured (REACT_APP_GOATCOUNTER_CODE is blank)")
    return home


@pytest.mark.smoke
def test_analytics_is_off_for_automated_browsers(page: Page, base_url: str):
    requests: list[str] = []
    page.on("request", lambda r: requests.append(r.url) if "goatcounter" in r.url or "gc.zgo.at" in r.url else None)
    HomePage(page, base_url).open()
    page.wait_for_load_state("networkidle")
    assert requests == []


@pytest.mark.regression
def test_page_view_is_counted_once(tracked_home: HomePage):
    tracked_home.page.wait_for_function("() => (window.__gc || []).length > 0")
    views = [v for v in sent(tracked_home.page) if not v.get("event")]
    assert views == [{"path": "/"}]


@pytest.mark.regression
def test_nav_click_is_tracked_as_an_event(tracked_home: HomePage):
    Navigation(tracked_home.page).go_to("Case Studies")
    events = [v["path"] for v in sent(tracked_home.page) if v.get("event")]
    assert "click-nav-case-studies" in events


@pytest.mark.regression
def test_outbound_and_button_clicks_are_tracked(tracked_home: HomePage):
    page = tracked_home.page
    page.get_by_role("button", name="Switch to light mode").click()
    # Record the outbound click without actually leaving for the external site
    page.evaluate("() => window.addEventListener('click', (e) => e.preventDefault())")
    page.get_by_role("link", name="Built with Claude Code by Anthropic").click()
    events = [v["path"] for v in sent(page) if v.get("event")]
    assert "click-button-switch-to-light-mode" in events
    assert any(e.startswith("click-out-claude-com") for e in events)


@pytest.mark.regression
def test_testing_page_counts_as_its_own_page_view(tracked_home: HomePage):
    page = tracked_home.page
    page.evaluate("() => { window.location.hash = '#/testing'; }")
    page.wait_for_function("() => (window.__gc || []).some(v => v.path === '/testing')")
