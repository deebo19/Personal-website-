import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { LINKS } from '../data';
import '../assets/styles/Footer.scss'

function Footer() {
  return (
    <footer>
      <div>
        <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon/></a>
        <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon/></a>
      </div>
      <p>© {new Date().getFullYear()} Adeeb Hussain · Covered by its own <a href="https://github.com/deebo19/Personal-website-/actions" target="_blank" rel="noreferrer">automated test suite</a></p>
      <p className="credit">Design based on the open-source template by <a href="https://github.com/yujisatojr/react-portfolio-template" target="_blank" rel="noreferrer">Yuji Sato</a> (MIT)</p>
    </footer>
  );
}

export default Footer;
