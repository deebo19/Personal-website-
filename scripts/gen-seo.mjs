// Writes robots.txt and sitemap.xml for the address in .env, so a URL change is one edit.
import { readFileSync, writeFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8").split("\n")
    .filter((l) => /^\s*REACT_APP_\w+=/.test(l))
    .map((l) => l.split("=").map((s) => s.trim()))
);
const site = (process.env.REACT_APP_SITE_URL || env.REACT_APP_SITE_URL).replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
</urlset>
`
);
console.log(`Wrote robots.txt and sitemap.xml for ${site}`);
