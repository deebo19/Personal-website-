import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MetaLogo, Channel4Logo } from './Logos';
import { ROLES, EDUCATION } from '../data';
import '../assets/styles/Timeline.scss';

const PURPLE = '#5000ca';
const META_BLUE = '#0064e0';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h2>Career History</h2>
        <VerticalTimeline>
          {ROLES.map((role) => (
            <VerticalTimelineElement
              key={role.title + role.dates}
              className={`vertical-timeline-element--work${role.meta ? ' role-meta' : ''}`}
              contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date={role.dates}
              iconStyle={{ background: role.meta ? META_BLUE : PURPLE, color: 'white' }}
              icon={<FontAwesomeIcon icon={faBriefcase} />}
            >
              <h3 className="vertical-timeline-element-title">{role.title}</h3>
              <h4 className="vertical-timeline-element-subtitle company">
                {role.meta && <MetaLogo/>}{role.c4 && <Channel4Logo/>} {role.company}
              </h4>
              <ul className="role-points">
                {role.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </VerticalTimelineElement>
          ))}
          {EDUCATION.map((e) => (
            <VerticalTimelineElement
              key={e.title}
              className="vertical-timeline-element--education"
              contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date={e.dates}
              iconStyle={{ background: '#2a2f3a', color: 'white' }}
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
            >
              <h3 className="vertical-timeline-element-title">{e.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{e.place}</h4>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
