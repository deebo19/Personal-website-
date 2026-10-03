import React from 'react';
import ReactDOM from 'react-dom/client';
// Self-hosted fonts (no third-party requests)
import '@fontsource/unbounded/500.css';
import '@fontsource/unbounded/700.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import './index.scss';
import App from './App';
import { initAnalytics } from './analytics';

import reportWebVitals from './reportWebVitals';

// Always open the portfolio at the top. Tapping a menu item leaves "#section" in the address,
// so reopening, refreshing or sharing that link would otherwise jump straight to that section;
// browsers (notably iOS Safari) also restore the previous scroll position on reload.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
if (window.location.hash && !window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);
initAnalytics();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
