# QA Lead Portfolio

A personal website for recruiters and hiring managers. It shows my testing experience end to end,
from requirements and risk analysis through to release sign-off. The site has its own automated test suite.

**Stack:** plain HTML/CSS/JS with no build step, hosted on GitHub Pages and tested with Playwright and axe-core.

## Run it locally

```bash
npm install
npm start        # http://localhost:4173
npm test         # run the full test suite (desktop + mobile)
```

## What the tests check

| Check | Why it matters |
|---|---|
| Title, heading, all 8 lifecycle stages present | Content regressions |
| Nav anchors resolve to real sections | Broken navigation |
| No local link or asset returns 404 | Broken résumé link, missing images |
| Theme toggle and mobile menu work | Interactive behaviour |
| No horizontal scroll on mobile | Responsive layout |
| No console errors | JS regressions |
| WCAG 2 A/AA via axe-core, light and dark themes | Accessibility |

CI runs the tests on every push and pull request. Pushes to `main` deploy to GitHub Pages **only if all tests pass**.
That's a quality gate, the same way I'd set one up for a product team.

## Go live (one-time setup)

1. Merge this branch into `main`.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. The next push to `main` publishes to `https://deebo19.github.io/Personal-website-/`.
4. Optional: buy a domain such as `yourname.com`, add it under **Settings → Pages → Custom domain**, and turn on **Enforce HTTPS**.

> GitHub Pages is free only for **public** repos on a free account, so make the repo public.
> That's useful anyway, because recruiters can then see the tests and CI.

## Personalise it

Search `index.html` for `TODO`, `Your Name`, `X`, `XX%` and `Company Name`, then:

- Replace `assets/resume.pdf` with your real résumé (keep the filename).
- Update the email and LinkedIn links in the Contact section.
- Use real, defensible numbers in the hero stats and experience bullets.
- Write 2 or 3 case studies in the form problem → approach → measurable result.
