# QA framework: Python + Playwright + Page Object Model

End-to-end tests for the portfolio, written with [pytest-playwright](https://playwright.dev/python/docs/test-runners) using the Page Object Model. It runs headless in CI on every push, alongside the JS Playwright suite, and the site only deploys if both pass.

## Layout

```
qa/
├── conftest.py      # fixtures: serves ../build, opens pages, mobile context
├── pytest.ini       # headless chromium, tracing/screenshots on failure, markers
├── pages/           # page objects: selectors and actions live here
│   └── components/  # shared parts: navigation, hero, timeline
└── tests/           # tests only use page objects
```

## Run it headless

```bash
npm ci && npm run build              # from the repo root: the suite tests the production build
pip install -r qa/requirements.txt
playwright install chromium
cd qa && pytest                      # headless by default
```

| Command | What it does |
|---|---|
| `pytest -m smoke` | fast smoke checks only |
| `pytest -m "not mobile"` | skip emulated-phone tests |
| `pytest --headed --slowmo 300` | watch it in a visible browser |
| `pytest --browser firefox` | run on Firefox (or `webkit`) |
| `QA_BASE_URL=https://deebo19.github.io/Personal-website- pytest` | test the live site |

Failures keep a screenshot and a Playwright trace in `qa/test-results/`; open one with `playwright show-trace <file>`.
