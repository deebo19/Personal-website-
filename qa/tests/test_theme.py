import pytest

from pages.home_page import HomePage


@pytest.mark.regression
def test_theme_toggles_between_dark_and_light(home: HomePage):
    assert home.nav.current_theme() == "dark"
    assert home.nav.toggle_theme() == "light"
    assert home.nav.toggle_theme() == "dark"
