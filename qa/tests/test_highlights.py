import pytest
from playwright.sync_api import Page, expect

from pages.home_page import HomePage


@pytest.mark.regression
def test_reel_starts_paused_on_the_first_highlight(home: HomePage):
    assert home.highlights.position() == (1, 7)
    assert not home.highlights.is_playing()
    expect(home.highlights.dots).to_have_count(7)


@pytest.mark.regression
def test_next_and_previous_wrap_around(home: HomePage):
    reel = home.highlights
    reel.next()
    assert reel.position() == (2, 7)
    reel.previous()
    reel.previous()
    assert reel.position() == (7, 7), "previous from the first slide should wrap to the last"
    reel.next()
    assert reel.position() == (1, 7), "next from the last slide should wrap to the first"


@pytest.mark.regression
def test_dots_jump_to_a_highlight(home: HomePage):
    home.highlights.go_to(6)
    assert home.highlights.position() == (6, 7)
    expect(home.highlights.headline).to_have_text("Coldplay, live in VR")
    expect(home.highlights.dots.nth(5)).to_have_attribute("aria-current", "true")


@pytest.mark.regression
def test_autoplay_advances_every_8_seconds_and_stops_at_the_end(page: Page, base_url: str):
    page.clock.install()  # control time instead of waiting a real minute
    reel = HomePage(page, base_url).open().highlights
    reel.play()
    page.clock.run_for(8_000)
    assert reel.position() == (2, 7)
    reel.pause()
    page.clock.run_for(30_000)
    assert reel.position() == (2, 7), "a paused reel must not move"
    reel.go_to(6)
    reel.play()
    page.clock.run_for(8_000)
    assert reel.position() == (7, 7)
    page.clock.run_for(8_000)
    assert reel.position() == (7, 7) and not reel.is_playing(), "the reel should stop on the last slide"
    reel.play()
    assert reel.position() == (1, 7), "pressing play at the end restarts from the first highlight"
