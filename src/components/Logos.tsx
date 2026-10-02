import React from "react";
import discoveryIcon from "../assets/images/discovery-plus-icon.png";
import selfridgesWordmark from "../assets/images/selfridges-wordmark.png";

// Brand marks from simple-icons (CC0). Decorative: the company name is always shown alongside.
export const META_PATH = "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z";
type LogoProps = { className?: string };

export function MetaLogo({ className = "" }: LogoProps) {
  return (
    <svg className={`logo logo-meta ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={META_PATH} />
    </svg>
  );
}

export function Channel4Logo({ className = "" }: LogoProps) {
  return (
    <svg className={`logo ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m14.309 0-.33.412v4.201l2.382-2.95zm-1.155 1.201L10.707 4.22v8.674h2.447zm3.268 1.701-2.443 3.02v14.81h2.443zM9.887 5.236l-6.201 7.657h3.142L9.887 9.12Zm-6.766 8.48v2.444h10.033v-2.443Zm14.125 0v2.444h3.633v-2.443Zm-6.539 3.268V24h2.443v-7.016Zm-3.271 4.573V24h2.443v-2.443zm6.543 0V24h5.189v-2.443z" />
    </svg>
  );
}

// Large gradient Meta mark used as a backdrop behind the avatar.
export function MetaBackdrop() {
  return (
    <svg className="avatar-backdrop" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="meta-backdrop-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0081fb" />
          <stop offset="55%" stopColor="#5000ca" />
          <stop offset="100%" stopColor="#c13584" />
        </linearGradient>
      </defs>
      <path d={META_PATH} fill="url(#meta-backdrop-gradient)" />
    </svg>
  );
}

// discovery+ "D" mark (full colour)
export function DiscoveryLogo() {
  return <img className="logo logo-discovery" src={discoveryIcon} width="160" height="135" alt="" aria-hidden="true" />;
}

// Selfridges & Co wordmark, drawn as a mask so it takes the current text colour in either theme
export function SelfridgesLogo() {
  return (
    <span
      className="logo-selfridges"
      aria-hidden="true"
      style={{ WebkitMaskImage: `url(${selfridgesWordmark})`, maskImage: `url(${selfridgesWordmark})` }}
    />
  );
}

export type LogoKey = "meta" | "c4" | "discovery" | "selfridges";

export function CompanyLogo({ logo }: { logo?: LogoKey }) {
  switch (logo) {
    case "meta": return <MetaLogo/>;
    case "c4": return <Channel4Logo/>;
    case "discovery": return <DiscoveryLogo/>;
    case "selfridges": return <SelfridgesLogo/>;
    default: return null;
  }
}
