import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import avatar from '../assets/images/avatar.png';
import { MetaLogo, Channel4Logo, MetaBackdrop } from './Logos';
import { LINKS, PROFILE, STATS } from '../data';
import '../assets/styles/Main.scss';

function SocialIcons({ className }: { className: string }) {
  return (
    <div className={className}>
      <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
      <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
      <a href={LINKS.email} aria-label="Email"><EmailIcon/></a>
    </div>
  );
}

function Main() {
  return (
    <div className="container" id="top">
      <div className="about-section">
        <div className="content">
          <SocialIcons className="social_icons" />
          <p className="eyebrow">{PROFILE.title} · {PROFILE.location}</p>
          <h1>{PROFILE.name}</h1>
          <p className="tagline">I make sure software ships <em>right</em>.</p>
          <p className="intro">{PROFILE.intro}</p>
          <SocialIcons className="mobile_social_icons" />
          <ul className="hero-stats" aria-label="Highlights">
            {STATS.map((s) => (
              <li key={s.label}><span className="stat-num">{s.value}</span><span className="stat-label">{s.label}</span></li>
            ))}
          </ul>
          <div className="logo-strip">
            <p className="logo-strip-label">Shipped quality at</p>
            <ul className="logo-list">
              <li className="brand-meta"><MetaLogo/><span>Meta</span></li>
              <li><Channel4Logo/><span>Channel 4</span></li>
              <li><span>Discovery+</span></li>
              <li><span>Selfridges</span></li>
            </ul>
          </div>
        </div>
        <div className="image-wrapper">
          <MetaBackdrop />
          <img className="avatar" src={avatar} width="244" height="775" alt="Adeeb's 3D avatar" />
        </div>
      </div>
    </div>
  );
}

export default Main;
