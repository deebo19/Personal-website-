import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRobot, faVrCardboard, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import { EXPERTISE } from '../data';
import '../assets/styles/Expertise.scss';

const ICONS: Record<string, IconDefinition> = { lead: faUsers, ai: faRobot, platforms: faVrCardboard };

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h2>Expertise</h2>
        <div className="skills-grid">
          {EXPERTISE.map((area) => (
            <div className="skill" key={area.title}>
              <FontAwesomeIcon icon={ICONS[area.icon]} size="3x" aria-hidden="true"/>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
              <div className="flex-chips">
                <span className="chip-title">Tools &amp; skills:</span>
                {area.chips.map((label) => (
                  <Chip key={label} className="chip" label={label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Expertise;
