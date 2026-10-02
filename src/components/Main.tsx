import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import avatar from '../assets/images/avatar.png';
import { MetaLogo, Channel4Logo, MetaBackdrop } from './Logos';
import { LINKS, PROFILE, COMPANY_STATS, CompanyStat } from '../data';
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

function CompanyLogo({ logo }: { logo: CompanyStat["logo"] }) {
  if (logo === "meta") return <MetaLogo/>;
  if (logo === "c4") return <Channel4Logo/>;
  return null;
}

function Main() {
  return (
    <div className="container" id="top">
      <div className="about-section">
        <div className="content">
          <SocialIcons className="social_icons" />
          <h1>{PROFILE.name}</h1>
          <p className="job-title">
            {PROFILE.title} at <span className="job-company"><MetaLogo/>{PROFILE.company}</span>
            <span className="job-location"> · {PROFILE.location}</span>
          </p>
          <p className="tagline">{PROFILE.tagline}</p>
          <p className="intro">{PROFILE.intro}</p>
          <SocialIcons className="mobile_social_icons" />
          <p className="company-stats-label">Products I've helped ship</p>
          <ul className="company-stats">
            {COMPANY_STATS.map((c) => (
              <li key={c.company} className={c.logo === "meta" ? "is-meta" : undefined}>
                <span className="company-name"><CompanyLogo logo={c.logo}/>{c.company}</span>
                <span className="stat-num">{c.value}</span>
                <span className="stat-label">{c.label}</span>
                <a className="stat-source" href={c.source} target="_blank" rel="noreferrer">
                  Source<span className="visually-hidden"> for {c.company} figure</span>
                </a>
              </li>
            ))}
          </ul>
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
