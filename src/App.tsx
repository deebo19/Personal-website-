import React, { useState, useEffect } from "react";
import {
  Main,
  Approach,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
  TestingPage,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

// Tiny hash router: "#/testing" shows the testing page, anything else is the home page
// (where "#section" hashes scroll to that section).
const routeFromHash = () => (window.location.hash.startsWith('#/testing') ? 'testing' : 'home');

function App() {
  const [mode, setMode] = useState<string>('dark');
  const [route, setRoute] = useState<string>(routeFromHash());

  const handleModeChange = () => setMode(mode === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = route === 'testing'
      ? 'How I test this site — Adeeb Hussain'
      : 'Adeeb Hussain — AI QA Engineering Lead';
    if (route === 'testing') {
      window.scrollTo(0, 0);
      return;
    }
    // Arriving on the home page from the testing page: jump to the requested section once it exists.
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [route]);

  return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange}/>
      <main>
        {route === 'testing' ? (
          <TestingPage/>
        ) : (
          <FadeIn transitionDuration={700}>
            <Main/>
            <Expertise/>
            <Project/>
            <Timeline/>
            <Approach/>
            <Contact/>
          </FadeIn>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
