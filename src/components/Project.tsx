import React from "react";
import { MetaLogo } from './Logos';
import { CASE_STUDIES } from '../data';
import '../assets/styles/Project.scss';

function Project() {
  return (
    <div className="projects-container" id="projects">
      <h2>Case Studies</h2>
      <p className="section-intro">Problem → approach → result.</p>
      <div className="projects-grid">
        {CASE_STUDIES.map((cs, i) => (
          <article className={`project${i === 0 ? ' project-featured' : ''}`} key={cs.title}>
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
