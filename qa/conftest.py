"""Shared fixtures for the Page Object Model suite.

The suite tests the production build (`npm run build` -> ../build), served on a local port,
so what gets tested is exactly what gets deployed.
"""
import functools
import os
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import pytest
from playwright.sync_api import Page

from pages.home_page import HomePage
from pages.testing_page import TestingPage

BUILD_DIR = Path(__file__).resolve().parent.parent / "build"
PORT = int(os.environ.get("QA_PORT", "4174"))


@pytest.fixture(scope="session")
def base_url() -> str:
    """Serve the built site for the whole run, unless QA_BASE_URL points at a deployed one."""
    external = os.environ.get("QA_BASE_URL")
    if external:
        yield external.rstrip("/")
        return
    if not (BUILD_DIR / "index.html").exists():
        pytest.exit("No build found. Run `npm run build` first.", returncode=2)

    class QuietHandler(SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(QuietHandler, directory=str(BUILD_DIR))
    server = ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{PORT}"
    server.shutdown()


@pytest.fixture
def home(page: Page, base_url: str) -> HomePage:
    return HomePage(page, base_url).open()


@pytest.fixture
def testing_page(page: Page, base_url: str) -> TestingPage:
    return TestingPage(page, base_url).open()


@pytest.fixture
def mobile_page(playwright, browser, base_url: str):
    """A page running in an emulated Pixel 7."""
    context = browser.new_context(**playwright.devices["Pixel 7"])
    page = context.new_page()
    yield page
    context.close()
