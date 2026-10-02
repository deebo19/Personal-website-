import React from 'react';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { LINKS } from '../data';
import '../assets/styles/Contact.scss';

function Contact() {
  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h2>Contact Me</h2>
          <p>Open to QA leadership roles. The quickest way to reach me:</p>
          <div className="contact-buttons">
            <Button variant="contained" className="contact-primary" startIcon={<EmailIcon />} href={LINKS.email}>
              Email me
            </Button>
            <Button variant="outlined" className="contact-secondary" startIcon={<LinkedInIcon />} href={LINKS.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
