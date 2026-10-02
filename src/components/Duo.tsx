import React from "react";
import photo from '../assets/images/meta-hq.jpg';
import { MetaLogo } from './Logos';
import '../assets/styles/Duo.scss';

function Duo() {
  return (
    <div className="container" id="about">
      <div className="duo-container">
        <figure className="duo-photo">
          <img
            src={photo}
            width="1000"
            height="1109"
            loading="lazy"
            alt="Adeeb giving a thumbs up in front of the Meta sign at 1 Hacker Way, with his 3D avatar standing beside him"
          />
        </figure>
        <div className="duo-text">
          <p className="duo-eyebrow"><MetaLogo/>1 Hacker Way, Menlo Park</p>
          <h2>Real me, virtual me</h2>
          <p>
            Me and my avatar at Meta HQ. I spend my days making sure Meta's virtual worlds feel as solid as this
            sign: leading the Horizon Worlds QA team, from live launches like Coldplay in the new Arena to moving the team
            onto agentic, AI-driven testing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Duo;
