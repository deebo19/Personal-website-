import pytest

from pages.home_page import HomePage


@pytest.mark.smoke
def test_no_local_link_or_asset_is_broken(home: HomePage):
    broken = [(url, status) for url in home.local_asset_urls()
              if (status := home.page.request.get(url).status) != 200]
    assert not broken, f"Broken local URLs: {broken}"


@pytest.mark.smoke
def test_no_console_errors_on_load(page, base_url: str):
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    HomePage(page, base_url).open()
    page.wait_for_load_state("networkidle")
    assert errors == []


@pytest.mark.mobile
def test_no_horizontal_scroll_on_mobile(mobile_page, base_url: str):
    HomePage(mobile_page, base_url).open()
    overflow = mobile_page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
    assert overflow <= 0
