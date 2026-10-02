# Adeeb Hussain — QA Lead Portfolio

Live site: **https://deebo19.github.io/Personal-website-/**

A portfolio for recruiters and hiring managers covering my QA career end to end, with its own automated test suite and a deploy that only ships when every test passes.

**Stack:** React + TypeScript + SCSS (Create React App), Material UI. Hosted on GitHub Pages, tested with Playwright and axe-core.
**Design:** based on the open-source [react-portfolio-template](https://github.com/yujisatojr/react-portfolio-template) by Yuji Sato (MIT, see `LICENSE-template`).

## Editing content

All text, links, stats, roles and case studies live in **`src/data.tsx`**. Change that file and push: CI rebuilds, retests and redeploys.

## Run it locally

```bash
npm install
npm start        # dev server with live reload at http://localhost:3000
npm test         # builds, then runs the full test suite (desktop + mobile)
```

## What the tests check

| Check | Why it matters |
|---|---|
| Title, single h1, avatar loads | Content and SEO regressions |
| 7 roles, 7 case studies, all 8 approach stages | Missing content |
| Nav links point to real sections | Broken navigation |
| No local link or asset returns 404 | Broken files after a build |
| Theme toggle and mobile menu work | Interactive behaviour |
| Contact buttons go to email and LinkedIn | Recruiters can reach me |
| No horizontal scroll, no console errors | Layout and JS regressions |
| WCAG 2 A/AA via axe-core, in dark **and** light mode | Accessibility |

CI (`.github/workflows/ci.yml`) builds the site, runs the tests against that exact build, checks the bundle has every referenced file, and only then deploys it from `main`.
