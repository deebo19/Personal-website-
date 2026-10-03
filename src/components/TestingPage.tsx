import React from "react";
import { SNIPPETS } from "../generated/snippets";
import '../assets/styles/TestingPage.scss';

const REPO = process.env.REACT_APP_REPO_URL;

const PIPELINE = [
  { step: "Push", detail: "Any commit to any branch starts the pipeline." },
  { step: "Build", detail: "React production build, with warnings treated as errors." },
  { step: "JS Playwright suite", detail: "Desktop + emulated Pixel 7, including axe accessibility scans in dark and light mode." },
  { step: "Python POM suite", detail: "pytest + Playwright, Page Object Model, headless Chromium." },
  { step: "Bundle check", detail: "Every file the page references must exist in the deploy bundle." },
  { step: "Deploy", detail: "Only from main, and only the exact build that passed both suites." },
];

const TREE = `qa/
├── conftest.py            # fixtures: serves the build, opens pages
├── pytest.ini             # base config, markers, headless defaults
├── requirements.txt
├── pages/                 # Page Object Model
│   ├── base_page.py       # open(), title, main heading, navigation
│   ├── home_page.py       # sections, case studies, contact
│   ├── testing_page.py    # this page
│   └── components/        # reusable parts shared by pages
│       ├── navigation.py      # links, theme toggle, mobile menu
│       ├── hero.py            # title, tagline, company cards, images
│       ├── highlights.py      # "Career in 60 seconds" reel
│       ├── case_studies.py    # cards + company filter
│       ├── timeline.py        # career history
│       ├── contact.py         # email, copy, save as PDF
│       └── feedback_form.py   # rating, validation, prepared email
└── tests/                 # tests only ever talk to page objects
    ├── test_hero.py
    ├── test_highlights.py
    ├── test_case_study_filter.py
    ├── test_feedback.py
    ├── test_cv_tools.py       # copy email, PDF, theme memory, back to top, SEO data
    ├── test_navigation.py
    ├── test_content.py
    ├── test_theme.py
    ├── test_health.py
    ├── test_seo.py
    ├── test_analytics.py      # visit/click tracking, stubbed so tests never count
    └── test_testing_page.py`;

const RUN = `# 1. Build the site (the suite tests the production build)
npm ci
npm run build

# 2. Install the framework and a browser
python -m venv .venv && source .venv/bin/activate
pip install -r qa/requirements.txt
playwright install chromium

# 3. Run it — headless is the default
cd qa
pytest`;

const RUN_MORE = `pytest -m smoke                      # just the fast smoke checks
pytest -m "not mobile"               # skip the emulated-phone tests
pytest -n auto                       # in parallel (pip install pytest-xdist)
pytest --headed --slowmo 300         # watch it run in a visible browser
pytest --browser firefox             # or webkit
QA_BASE_URL=${process.env.REACT_APP_SITE_URL} pytest   # against the live site`;

const COVERAGE = [
  ["Highlight reel", "Starts paused; next/previous wrap; dots jump; autoplay every 8s using Playwright's fake clock; pauses; stops at the end; replays"],
  ["Feedback form", "Required rating and message, optional name/email, email format, focus on first error, prepared email decoded and checked, copy, reset"],
  ["Case study filter", "Each company shows only its studies with the right count; All restores 7; pressed state"],
  ["CV tools", "Copy email to clipboard, Save as PDF opens print, print layout is a clean CV, PDF is a few pages, theme remembered, back to top"],
  ["SEO", "Title, description, keywords, social preview tags, canonical link and schema.org Person data"],
  ["Hero", "Title, single h1, job title, tagline; me and my avatar side by side on the same floor line"],
  ["Company cards", "Four companies in order, each with a well-formed figure, a label and an https source"],
  ["Navigation", "Every link targets a real section; clicking scrolls it into view; mobile menu opens and closes"],
  ["Content", "7 case studies, 7 roles newest-first, 8 approach stages in order"],
  ["Contact", "Email and LinkedIn go to the right addresses"],
  ["Health", "No broken local URLs, no console errors, no horizontal scroll on mobile"],
  ["Accessibility", "axe-core WCAG 2 A/AA scan in both themes (JS suite)"],
];

function Code({ title, children }: { title?: string; children: string }) {
  return (
    <figure className="code-block">
      {title && <figcaption>{title}</figcaption>}
      <pre><code>{children}</code></pre>
    </figure>
  );
}

function TestingPage() {
  return (
    <div className="testing-page" id="testing">
      <a className="back-link" href="#top">← Back to portfolio</a>
      <p className="testing-eyebrow">QA, practised on my own site</p>
      <h1>How I test this site</h1>
      <p className="lead">
        This portfolio is tested the way I'd test a product. Every push runs two independent automated suites
        against the production build, and the site only deploys if both pass. Here's the Python framework I
        wrote for it with Playwright and the Page Object Model, and how to run it headless.
      </p>

      <section>
        <h2>The pipeline</h2>
        <ol className="pipeline">
          {PIPELINE.map((p, i) => (
            <li key={p.step}>
              <span className="pipeline-num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{p.step}</strong>
              <span>{p.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Why the Page Object Model</h2>
        <p>
          Tests describe <em>behaviour</em> ("the hero shows a sourced figure for each company"); page objects own
          the <em>selectors</em>. When the markup changes, I update one page object, not twenty tests. Components
          like the navigation are shared objects, so every page gets them for free.
        </p>
        <Code title="Framework layout">{TREE}</Code>
      </section>

      <section>
        <h2>Bugs the suite caught while I built it</h2>
        <ul className="caught">
          <li><strong>Hidden text:</strong> timeline entries stay hidden until scrolled into view, so <code>inner_text()</code> read them as empty. The page object now uses <code>text_content()</code>.</li>
          <li><strong>Styled text:</strong> case study tags are uppercased with CSS, so <code>inner_text()</code> returned "META · LIVE LAUNCH". Same fix.</li>
          <li><strong>A test that tested itself:</strong> a stubbed <code>window.print</code> was called twice. The string passed to <code>evaluate()</code> ended in a function, which Playwright then <em>called</em>. Wrapped in <code>() =&gt; {"{ … }"}</code>.</li>
          <li><strong>Invisible text:</strong> screenshots showed dark-on-dark labels in the new features; the app now sets a base text colour for each theme.</li>
          <li><strong>Print:</strong> the PDF dropped case studies when a filter was active; printing now resets the filter first.</li>
          <li><strong>SEO:</strong> the HTML had a keyword-rich page title, but the app overwrote it at runtime with a shorter one. A new SEO test caught it on its first run.</li>
        </ul>
      </section>

      <section>
        <h2>The code</h2>
        <p>These are the real files from the repository, copied in at build time.</p>
        <Code title="qa/pages/base_page.py">{SNIPPETS["qa/pages/base_page.py"]}</Code>
        <Code title="qa/pages/components/hero.py">{SNIPPETS["qa/pages/components/hero.py"]}</Code>
        <Code title="qa/tests/test_hero.py">{SNIPPETS["qa/tests/test_hero.py"]}</Code>
        <Code title="qa/pages/components/feedback_form.py">{SNIPPETS["qa/pages/components/feedback_form.py"]}</Code>
        <Code title="qa/tests/test_feedback.py">{SNIPPETS["qa/tests/test_feedback.py"]}</Code>
        <Code title="qa/tests/test_highlights.py: controlling time with page.clock">{SNIPPETS["qa/tests/test_highlights.py"]}</Code>
        <Code title="qa/conftest.py">{SNIPPETS["qa/conftest.py"]}</Code>
      </section>

      <section id="run-headless">
        <h2>Run it on a headless browser</h2>
        <p>
          Playwright runs headless by default: no window, ideal for CI and fast locally. The suite starts its own
          web server for the build, so there's nothing else to launch.
        </p>
        <Code title="Terminal">{RUN}</Code>
        <Code title="Useful variations">{RUN_MORE}</Code>
        <Code title="qa/pytest.ini">{SNIPPETS["qa/pytest.ini"]}</Code>
        <p>
          On failure, pytest-playwright keeps a screenshot and a full trace in <code>qa/test-results</code>. Open a
          trace with <code>playwright show-trace</code> to step through every action, network call and DOM snapshot.
        </p>
      </section>

      <section>
        <h2>What's covered</h2>
        <table className="coverage">
          <thead><tr><th scope="col">Area</th><th scope="col">Checks</th></tr></thead>
          <tbody>
            {COVERAGE.map(([area, checks]) => (
              <tr key={area}><th scope="row">{area}</th><td>{checks}</td></tr>
            ))}
          </tbody>
        </table>
        <p>
          Source: <a href={`${REPO}/tree/main/qa`} target="_blank" rel="noreferrer">qa/ on GitHub</a>
          {" "}· Latest runs: <a href={`${REPO}/actions`} target="_blank" rel="noreferrer">GitHub Actions</a>
        </p>
      </section>
    </div>
  );
}

export default TestingPage;
