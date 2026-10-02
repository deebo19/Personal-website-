import React, { useState, useEffect } from "react";
import {
  Main,
  Duo,
  Approach,
  Timeline,
  Expertise,
  Project,
  Contact,
  Navigation,
  Footer,
} from "./components";
import FadeIn from './components/FadeIn';
import './index.scss';

function App() {
  const [mode, setMode] = useState<string>('dark');

  const handleModeChange = () => setMode(mode === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange}/>
      <main>
        <FadeIn transitionDuration={700}>
          <Main/>
          <Duo/>
          <Expertise/>
          <Project/>
          <Timeline/>
          <Approach/>
          <Contact/>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}

export default App;
