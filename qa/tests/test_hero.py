import re

import pytest
from playwright.sync_api import expect

from pages.home_page import HomePage


@pytest.mark.smoke
def test_title_and_single_main_heading(home: HomePage):
    assert re.search(r"Adeeb Hussain.*QA", home.title)
    expect(home.main_heading).to_have_count(1)
    expect(home.main_heading).to_have_text("Adeeb Hussain")


@pytest.mark.smoke
def test_job_title_and_tagline(home: HomePage):
    expect(home.hero.job_title).to_contain_text("AI QA Engineering Lead at Meta")
    expect(home.hero.job_title).to_contain_text("London")
    expect(home.hero.tagline).to_have_text("Shipping future tech with quality at speed using AI")


@pytest.mark.regression
def test_real_me_stands_next_to_my_avatar(home: HomePage):
    for img in (home.hero.photo_of_me, home.hero.avatar):
        expect(img).to_be_visible()
        assert home.hero.image_loaded(img)
    me, avatar = home.hero.photo_of_me.bounding_box(), home.hero.avatar.bounding_box()
    assert me["x"] < avatar["x"], "I should stand on the left of my avatar"
    # Feet on the same floor line (within a few pixels)
    assert abs((me["y"] + me["height"]) - (avatar["y"] + avatar["height"])) <= 4


@pytest.mark.regression
def test_each_company_card_has_a_figure_and_a_source(home: HomePage):
    cards = home.hero.company_cards()
    assert [c.company for c in cards] == ["Meta", "Discovery+", "Selfridges", "Channel 4"]
    for card in cards:
        assert re.match(r"^[\d.,]+[MBK]?\+?$", card.figure), f"{card.company}: odd figure {card.figure!r}"
        assert card.label, f"{card.company} has no label saying what the figure measures"
        assert card.source.startswith("https://"), f"{card.company} has no source link"


@pytest.mark.regression
def test_hero_images_have_no_css_filters(home: HomePage):
    """iOS Safari colour-manages filtered images differently from the page, so a CSS filter on a
    cut-out image shows its transparent area as a faint rectangle. Guard against it coming back."""
    filters = home.page.evaluate(
        """() => [...document.querySelectorAll('#top .image-wrapper img, #top .image-wrapper svg')]
              .flatMap(el => { const out = []; for (let n = el; n && n.id !== 'top'; n = n.parentElement)
                                 out.push(getComputedStyle(n).filter); return out; })"""
    )
    assert set(filters) == {"none"}, f"CSS filter found in the hero image stack: {set(filters) - {'none'}}"


@pytest.mark.smoke
def test_built_with_claude_banner_is_at_the_top(home: HomePage):
    banner = home.page.get_by_role("link", name="Built with Claude Code by Anthropic")
    expect(banner).to_be_visible()
    expect(banner).to_have_attribute("href", "https://claude.com/claude-code")
    expect(banner).to_have_attribute("target", "_blank")
    # Shown before the name, so it's one of the first things visitors see
    assert banner.bounding_box()["y"] < home.main_heading.bounding_box()["y"]
