// True when the page arrived with a prerendered snapshot (see scripts/prerender.mjs), read before
// React replaces it. Animations then skip their entrance so content doesn't vanish and fade back in.
export const PRERENDERED = document.getElementById('root')?.hasAttribute('data-prerendered') ?? false;
