import re

from playwright.sync_api import Locator, Page


class Highlights:
    """'Career in 60 seconds' reel: play/pause, previous/next and dot navigation."""

    def __init__(self, page: Page):
        self.root = page.locator("#highlights")
        self.play_pause = self.root.get_by_role("button", name=re.compile(r"^(Play|Pause) highlights$"))
        self.next_button = self.root.get_by_role("button", name="Next highlight")
        self.previous_button = self.root.get_by_role("button", name="Previous highlight")
        self.headline = self.root.locator(".reel-headline")
        self.counter = self.root.locator(".reel-counter")

    @property
    def dots(self) -> Locator:
        return self.root.locator(".reel-dots button")

    def position(self) -> tuple[int, int]:
        current, total = self.counter.inner_text().split("/")
        return int(current), int(total)

    def is_playing(self) -> bool:
        return self.play_pause.get_attribute("aria-label") == "Pause highlights"

    def play(self) -> None:
        if not self.is_playing():
            self.play_pause.click()

    def pause(self) -> None:
        if self.is_playing():
            self.play_pause.click()

    def next(self) -> None:
        self.next_button.click()

    def previous(self) -> None:
        self.previous_button.click()

    def go_to(self, number: int) -> None:
        self.dots.nth(number - 1).click()
