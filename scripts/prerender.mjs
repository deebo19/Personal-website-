// Runs after `npm run build`: opens the built site in headless Chromium and saves the rendered
// home page into build/index.html. Search engines, link previews and AI crawlers that don't run
// JavaScript then see the full page (name, title, experience) instead of an empty <div id="root">.
// React replaces the snapshot with the live app as soon as the bundle loads.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const PORT = 4175;
const FILE = "build/index.html";

const env = Object.fromEntries(
  readFileSync(".env", "utf8").split("\n")
    .filter((l) => /^\s*REACT_APP_\w+=/.test(l))
    .map((l) => l.split("=").map((s) => s.trim()))
);
const verification = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION ?? env.REACT_APP_GOOGLE_SITE_VERIFICATION;

// Before the first paint: show the visitor's saved theme, and drop the snapshot on "#/" routes
// (e.g. #/testing) so the home page never flashes up before them.
const BOOT = `<script>(function(){var r=document.getElementById('root');try{if(location.hash.indexOf('#/')===0){r.innerHTML='';r.removeAttribute('data-prerendered');return}if(localStorage.getItem('theme')==='light'){var m=r.querySelector('.main-container');if(m)m.className=m.className.replace('dark-mode','light-mode')}}catch(e){}})()</script>`;

async function snapshot() {
  const server = spawn(process.execPath, ["tests/serve.mjs"], { env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ colorScheme: "dark", viewport: { width: 1280, height: 900 } });
    for (let i = 0; ; i++) {
      try { await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" }); break; }
      catch (e) { if (i > 20) throw e; await new Promise((r) => setTimeout(r, 250)); }
    }
    await page.locator("h1").first().waitFor();
    await page.waitForTimeout(2000); // let the section fade-ins finish
    return await page.evaluate(() => ({
      html: document.getElementById("root").innerHTML,
      // MUI/emotion styles live only in the CSSOM in production; keep them so the snapshot is styled
      css: [...document.styleSheets]
        .filter((s) => s.ownerNode?.hasAttribute?.("data-emotion"))
        .flatMap((s) => [...s.cssRules].map((r) => r.cssText))
        .join("\n"),
    }));
  } finally {
    await browser.close();
    server.kill();
  }
}

let out = readFileSync(FILE, "utf8");
if (out.includes("data-prerendered")) {
  console.log("prerender: already done");
  process.exit(0);
}
if (verification) {
  out = out.replace("</head>", `<meta name="google-site-verification" content="${verification}"/></head>`);
}

try {
  const { html, css } = await snapshot();
  if (!html.includes("<h1")) throw new Error("rendered page has no <h1>");
  out = out
    .replace("</head>", `<style data-prerendered>${css}</style></head>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${html}</div>${BOOT}`);
  writeFileSync(FILE, out);
  console.log(`prerender: wrote ${Math.round(html.length / 1024)} KB of rendered HTML into ${FILE}`);
} catch (e) {
  writeFileSync(FILE, out);
  // In CI a missing snapshot must fail the build, so search engines never silently get an empty page.
  if (process.env.CI) { console.error(`prerender failed: ${e.message}`); process.exit(1); }
  console.warn(`prerender skipped (${e.message}). Run "npx playwright install chromium" to enable it locally.`);
}
