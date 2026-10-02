import React from "react";
import { APPROACH } from '../data';
import '../assets/styles/Approach.scss';

function Approach() {
  return (
    <div className="container" id="approach">
      <div className="approach-container">
        <h2>Quality, start to finish</h2>
        <p className="section-intro">Bugs found earlier in the SDLC are cheaper to fix. Here's how I own quality at every stage.</p>
        <ol className="lifecycle">
          {APPROACH.map((step, i) => (
            <li className="stage" key={step.title}>
              <span className="stage-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <p className="deliverable"><span>Output:</span> {step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Approach;
