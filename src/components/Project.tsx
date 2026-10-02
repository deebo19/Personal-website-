import React, { useEffect, useState } from "react";
import { MetaLogo } from './Logos';
import { CASE_STUDIES } from '../data';
import '../assets/styles/Project.scss';

const companyOf = (tag: string) => tag.split(" · ")[0];
const COMPANIES = ["All", ...Array.from(new Set(CASE_STUDIES.map((cs) => companyOf(cs.tag))))];

function Project() {
  const [filter, setFilter] = useState("All");

  // A printed / PDF CV should always include every case study, whatever filter is on screen.
  useEffect(() => {
    const showAll = () => setFilter("All");
    window.addEventListener("beforeprint", showAll);
    return () => window.removeEventListener("beforeprint", showAll);
  }, []);
  const shown = CASE_STUDIES.filter((cs) => filter === "All" || companyOf(cs.tag) === filter);

  return (
    <div className="projects-container" id="projects">
      <h2>Case Studies</h2>
      <p className="section-intro">Problem → approach → result.</p>

      <div className="case-filter" role="group" aria-label="Filter case studies by company">
        {COMPANIES.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
        ))}
        <span className="case-count" aria-live="polite">Showing {shown.length} of {CASE_STUDIES.length}</span>
      </div>

      <div className="projects-grid">
        {shown.map((cs, i) => (
          <article className={`project${i === 0 && shown.length > 1 ? ' project-featured' : ''}`} key={cs.title}>
            <div className="project-banner zoom">
              <span className="banner-tag">{cs.meta && <MetaLogo/>}{cs.tag}</span>
              <span className="banner-stat">{cs.stat}</span>
              <span className="banner-label">{cs.statLabel}</span>
            </div>
            <h3>{cs.title}</h3>
            <dl>
              <dt>Problem</dt><dd>{cs.problem}</dd>
              <dt>Approach</dt><dd>{cs.approach}</dd>
              <dt>Result</dt><dd>{cs.result}</dd>
            </dl>
            {cs.link && <a className="project-link" href={cs.link.href} target="_blank" rel="noreferrer">{cs.link.label} →</a>}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Project;
