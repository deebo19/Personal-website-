import React, { useState } from 'react';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { LINKS, CONTACT_EMAIL } from '../data';
import '../assets/styles/Contact.scss';

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

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
            <Button variant="outlined" className="contact-secondary" startIcon={<ContentCopyIcon />} onClick={copyEmail}>
              {copied ? "Email copied!" : "Copy email"}
            </Button>
            <Button variant="outlined" className="contact-secondary" startIcon={<PictureAsPdfIcon />} onClick={() => window.print()}>
              Save CV as PDF
            </Button>
          </div>
          <p className="print-only">Email: {CONTACT_EMAIL} · LinkedIn: linkedin.com/in/adeebhussain · Portfolio: {(process.env.REACT_APP_SITE_URL || "").replace(/^https:\/\//, "")}</p>
          <p className="contact-hint" aria-live="polite">{copied ? `${CONTACT_EMAIL} is on your clipboard.` : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
