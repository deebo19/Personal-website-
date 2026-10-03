// Cookie-free visit and click stats via GoatCounter (https://www.goatcounter.com).
// Nothing loads unless REACT_APP_GOATCOUNTER_CODE is set. Local dev and automated test runs
// (navigator.webdriver) are never counted, so the dashboard only shows real visitors.
// Tests can opt in with localStorage "analytics-test" = "1" and stub the script.

type GoatCounter = { count: (vars: { path: string; title?: string; event?: boolean }) => void };
declare global { interface Window { goatcounter?: GoatCounter } }

const CODE = process.env.REACT_APP_GOATCOUNTER_CODE;
const SCRIPT_SRC = 'https://gc.zgo.at/count.js';

const testOptIn = () => {
  try { return localStorage.getItem('analytics-test') === '1'; } catch { return false; }
};

const enabled = () => {
  if (!CODE) return false;
  if (testOptIn()) return true;
  const local = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  return !navigator.webdriver && !local;
};

// The site uses hash routes ("#/testing"), which GoatCounter would otherwise ignore.
const currentPath = () => (window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : '/');

const send = (vars: { path: string; title?: string; event?: boolean }) => {
  try { window.goatcounter?.count(vars); } catch { /* analytics must never break the page */ }
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9+]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// A readable name for whatever was clicked, e.g. "click-nav-case-studies" or "click-out-linkedin-com".
function describe(el: HTMLElement): string | null {
  const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ');
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    if (href.startsWith('mailto:')) return 'click-email';
    if (/^https?:/.test(href) && el.host !== window.location.host) {
      return `click-out-${slug(el.hostname.replace(/^www\./, ''))}${label ? `-${slug(label)}` : ''}`;
    }
    if (el.closest('#navigation, .MuiAppBar-root, .MuiDrawer-root')) return `click-nav-${slug(label || href)}`;
    return `click-link-${slug(label || href)}`;
  }
  return label ? `click-button-${slug(label)}` : null;
}

export function initAnalytics() {
  if (!enabled()) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = SCRIPT_SRC;
  script.dataset.goatcounter = `https://${CODE}.goatcounter.com/count`;
  // We send the first page view ourselves once the script is ready, with the hash route as the path.
  script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true, allow_local: testOptIn() });
  script.addEventListener('load', () => send({ path: currentPath() }));
  document.head.appendChild(script);

  window.addEventListener('hashchange', () => {
    if (window.location.hash.startsWith('#/') || window.location.hash === '') send({ path: currentPath() });
  });

  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button');
    const name = el && describe(el);
    if (name) send({ path: name, title: name, event: true });
  }, { capture: true });
}
