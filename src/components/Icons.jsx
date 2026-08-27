import "./Icons.css";

export function ClapIcon({ size = 40, className = "" }) {
  return (
    <svg
      className={`clap-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="14" y1="2" x2="17" y2="8" stroke="#3a7bff" strokeWidth="2.2" strokeLinecap="round" className="clap-spark" />
      <line x1="24" y1="0" x2="24" y2="7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" className="clap-spark" />
      <line x1="34" y1="2" x2="31" y2="8" stroke="#ff3b4e" strokeWidth="2.2" strokeLinecap="round" className="clap-spark" />
      <g transform="translate(16,24) rotate(-14) scale(0.72)">
        <g className="clap-hand">
          <rect x="6" y="0" width="5.5" height="10" rx="2.6" fill="#ffffff" transform="rotate(18 8.75 5)" />
          <rect x="2" y="-6" width="6" height="14" rx="3" fill="#ffffff" />
          <rect x="-3" y="-8" width="6" height="16" rx="3" fill="#ffffff" />
          <rect x="-8" y="-2" width="6" height="12" rx="3" fill="#ffffff" transform="rotate(-18 -5 4)" />
          <rect x="-8" y="6" width="16" height="10" rx="5" fill="#dbe6ff" />
        </g>
      </g>
      <g transform="translate(32,24) rotate(14) scale(-0.72,0.72)">
        <g className="clap-hand">
          <rect x="6" y="0" width="5.5" height="10" rx="2.6" fill="#ffffff" transform="rotate(18 8.75 5)" />
          <rect x="2" y="-6" width="6" height="14" rx="3" fill="#ffffff" />
          <rect x="-3" y="-8" width="6" height="16" rx="3" fill="#ffffff" />
          <rect x="-8" y="-2" width="6" height="12" rx="3" fill="#ffffff" transform="rotate(-18 -5 4)" />
          <rect x="-8" y="6" width="16" height="10" rx="5" fill="#dbe6ff" />
        </g>
      </g>
    </svg>
  );
}

export function MiniClap({ size = 13, color = "#ff5c6c" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill={color} opacity="0.16" />
      <rect x="9" y="7" width="4.4" height="8.5" rx="2.2" fill={color} />
      <rect x="5.5" y="9.5" width="3.6" height="6.8" rx="1.8" fill={color} transform="rotate(-16 5.5 9.5)" />
      <rect x="13.5" y="6.5" width="3.6" height="8" rx="1.8" fill={color} />
      <rect x="17" y="9" width="3.4" height="6.8" rx="1.7" fill={color} transform="rotate(18 17 9)" />
    </svg>
  );
}

export function SparkBurst({ flip = false, className = "" }) {
  return (
    <svg
      className={`confetti ${flip ? "left" : ""} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="4" y1="4" x2="14" y2="12" stroke="#3a7bff" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="18" x2="14" y2="19" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <line x1="6" y1="33" x2="15" y2="26" stroke="#ff3b4e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function GroupIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="14" r="5.4" stroke="#5b9dff" strokeWidth="2.2" />
      <circle cx="9" cy="18" r="4" stroke="#5b9dff" strokeWidth="2" />
      <circle cx="31" cy="18" r="4" stroke="#5b9dff" strokeWidth="2" />
      <path d="M9 33c0-5.2 4.9-9.4 11-9.4S31 27.8 31 33" stroke="#5b9dff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M2 30c.3-3.9 3.3-7 7-7" stroke="#5b9dff" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 30c-.3-3.9-3.3-7-7-7" stroke="#5b9dff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HelpIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(14,2.5) scale(0.5)">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="#ff5c6c"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>
      <rect x="7" y="18" width="26" height="16.5" rx="1.4" stroke="#5b9dff" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 22.5v6.5M16.7 25.75h6.6" stroke="#5b9dff" strokeWidth="2.1" strokeLinecap="round" />
      <rect x="10.5" y="21.5" width="3.4" height="3.4" stroke="#5b9dff" strokeWidth="1.6" />
      <rect x="26.1" y="21.5" width="3.4" height="3.4" stroke="#5b9dff" strokeWidth="1.6" />
      <rect x="17" y="30" width="6" height="4.5" stroke="#5b9dff" strokeWidth="1.6" />
    </svg>
  );
}

export function HeartIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 34S5 25.1 5 15.4C5 10.2 9.2 6 14.3 6c3 0 5.6 1.4 7.7 3.9C24.1 7.4 26.7 6 29.7 6 34.8 6 39 10.2 39 15.4 39 25.1 24 34 20 34z"
        transform="translate(-4)"
        stroke="#ff5c6c"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDown({ size = 26, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinGlyph({ active = "blue" }) {
  const color = active === "red" ? "#ff5c6c" : "#5b9dff";
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 33s10-11.4 10-19.6C23 6.1 18.5 1.5 13 1.5S3 6.1 3 13.4C3 21.6 13 33 13 33z"
        fill="#0b1436"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="13" cy="13" r="5" fill={color} />
      <circle cx="13" cy="13" r="2" fill="#0b1436" />
    </svg>
  );
}
