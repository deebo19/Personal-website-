import React, { useEffect, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CompanyLogo } from './Logos';
import { HIGHLIGHTS, SLIDE_SECONDS } from '../data';
import '../assets/styles/Highlights.scss';

// "Career in 60 seconds": a short, controllable highlight reel. Starts paused so nothing
// moves until the visitor asks; each slide shows for SLIDE_SECONDS while playing.
function Highlights() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = HIGHLIGHTS.length;
  const slide = HIGHLIGHTS[index];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (index === total - 1) setPlaying(false); // stop at the end
      else setIndex(index + 1);
    }, SLIDE_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [playing, index, total]);

  const go = (i: number) => setIndex((i + total) % total);
  const togglePlay = () => {
    if (!playing && index === total - 1) setIndex(0); // replay from the start
    setPlaying(!playing);
  };

  return (
    <div className="container" id="highlights">
      <div className="highlights-container">
        <h2>Career in 60 seconds</h2>
        <section className="reel" aria-roledescription="carousel" aria-label="Career highlights">
          <div
            className="reel-slide"
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            aria-live={playing ? "off" : "polite"}
          >
            <p className="reel-when">{slide.when}</p>
            <p className="reel-where"><CompanyLogo logo={slide.logo}/>{slide.logo === "selfridges" ? <span className="visually-hidden">{slide.where}</span> : slide.where}</p>
            <h3 className="reel-headline">{slide.headline}</h3>
            <p className="reel-detail">{slide.detail}</p>
          </div>

          <div className="reel-progress" aria-hidden="true">
            <span
              key={`${index}-${playing}`}
              className={playing ? "is-playing" : undefined}
              style={{ animationDuration: `${SLIDE_SECONDS}s` }}
            />
          </div>

          <div className="reel-controls">
            <button type="button" className="reel-btn" onClick={() => go(index - 1)} aria-label="Previous highlight">
              <ChevronLeftIcon/>
            </button>
            <button type="button" className="reel-btn reel-play" onClick={togglePlay} aria-label={playing ? "Pause highlights" : "Play highlights"}>
              {playing ? <PauseIcon/> : <PlayArrowIcon/>}
            </button>
            <button type="button" className="reel-btn" onClick={() => go(index + 1)} aria-label="Next highlight">
              <ChevronRightIcon/>
            </button>
            <ol className="reel-dots">
              {HIGHLIGHTS.map((h, i) => (
                <li key={h.when + h.where}>
                  <button
                    type="button"
                    aria-label={`Go to highlight ${i + 1}: ${h.headline}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setIndex(i)}
                  />
                </li>
              ))}
            </ol>
            <span className="reel-counter">{index + 1} / {total}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Highlights;
