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
