/**
 * FarmIllustrations.jsx
 * A library of inline SVG illustration components for the KrishiSaathi countryside theme.
 * Each component is a reusable, lightweight SVG — no image imports needed.
 * All use a consistent stroke-width and the earthy palette.
 */

// ─── Farmer Figure ──────────────────────────────
export function FarmerFigure({ className = '', size = 120, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 140" fill="none" className={className} style={style} aria-hidden="true">
      {/* Pagdi (turban) */}
      <ellipse cx="60" cy="22" rx="18" ry="12" fill="#D4A03A" opacity="0.85" />
      <path d="M48 22 Q60 8 72 22" stroke="#B8882E" strokeWidth="2" fill="none" />
      {/* Head */}
      <circle cx="60" cy="32" r="12" fill="#C2956A" stroke="#8B6B4A" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="55" cy="30" r="1.5" fill="#3B2F1E" />
      <circle cx="65" cy="30" r="1.5" fill="#3B2F1E" />
      {/* Smile */}
      <path d="M56 35 Q60 39 64 35" stroke="#3B2F1E" strokeWidth="1.2" fill="none" />
      {/* Body / Kurta */}
      <path d="M48 44 L42 85 H78 L72 44 Z" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
      {/* Dhoti */}
      <path d="M42 85 L38 130 H52 L55 95 H65 L68 130 H82 L78 85 Z" fill="white" stroke="#D4B98A" strokeWidth="1.5" />
      {/* Arms */}
      <line x1="48" y1="50" x2="30" y2="72" stroke="#C2956A" strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="50" x2="90" y2="72" stroke="#C2956A" strokeWidth="3" strokeLinecap="round" />
      {/* Hoe / Stick */}
      <line x1="28" y1="70" x2="22" y2="20" stroke="#8B6B4A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 22 Q22 16 26 22" stroke="#5A3E20" strokeWidth="2" fill="none" />
      {/* Feet */}
      <ellipse cx="45" cy="132" rx="6" ry="3" fill="#8B6B4A" />
      <ellipse cx="75" cy="132" rx="6" ry="3" fill="#8B6B4A" />
    </svg>
  );
}

// ─── Cattle Pair ──────────────────────────────
export function CattlePair({ className = '', size = 140, style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 140 80" fill="none" className={className} style={style} aria-hidden="true">
      {/* Cow 1 */}
      <g transform="translate(0, 10)">
        {/* Body */}
        <ellipse cx="45" cy="40" rx="28" ry="18" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="18" cy="30" r="10" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
        {/* Horns */}
        <path d="M14 22 Q10 12 16 14" stroke="#8B6B4A" strokeWidth="1.5" fill="none" />
        <path d="M22 22 Q26 12 20 14" stroke="#8B6B4A" strokeWidth="1.5" fill="none" />
        {/* Eye */}
        <circle cx="16" cy="28" r="1.5" fill="#3B2F1E" />
        {/* Snout */}
        <ellipse cx="14" cy="35" rx="4" ry="3" fill="#E8D4B8" stroke="#D4B98A" strokeWidth="1" />
        {/* Legs */}
        <line x1="30" y1="55" x2="30" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="56" x2="40" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="56" x2="52" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="55" x2="60" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        {/* Tail */}
        <path d="M73 38 Q80 30 78 42" stroke="#D4B98A" strokeWidth="1.5" fill="none" />
      </g>
      {/* Cow 2 (smaller, behind) */}
      <g transform="translate(55, 5) scale(0.75)" opacity="0.7">
        <ellipse cx="45" cy="40" rx="28" ry="18" fill="#E8D4B8" stroke="#D4B98A" strokeWidth="1.5" />
        <circle cx="18" cy="30" r="10" fill="#E8D4B8" stroke="#D4B98A" strokeWidth="1.5" />
        <path d="M14 22 Q10 12 16 14" stroke="#8B6B4A" strokeWidth="1.5" fill="none" />
        <path d="M22 22 Q26 12 20 14" stroke="#8B6B4A" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="28" r="1.5" fill="#3B2F1E" />
        <line x1="30" y1="55" x2="30" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="40" y1="56" x2="40" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="56" x2="52" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="55" x2="60" y2="70" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── Wheat Stalks ──────────────────────────────
export function WheatStalks({ className = '', size = 80, style = {} }) {
  const scale = size / 80;
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none" className={className} style={style} aria-hidden="true">
      {/* Stalk 1 */}
      <g>
        <line x1="25" y1="120" x2="25" y2="30" stroke="#7BA468" strokeWidth="2" />
        <ellipse cx="25" cy="28" rx="4" ry="8" fill="#D4A03A" opacity="0.9" />
        <ellipse cx="20" cy="35" rx="3" ry="6" fill="#D4A03A" opacity="0.7" transform="rotate(-20 20 35)" />
        <ellipse cx="30" cy="35" rx="3" ry="6" fill="#D4A03A" opacity="0.7" transform="rotate(20 30 35)" />
        {/* Leaves */}
        <path d="M25 70 Q10 60 15 50" stroke="#7BA468" strokeWidth="1.5" fill="none" />
        <path d="M25 85 Q40 75 35 65" stroke="#7BA468" strokeWidth="1.5" fill="none" />
      </g>
      {/* Stalk 2 */}
      <g transform="translate(20, 10)">
        <line x1="25" y1="110" x2="25" y2="25" stroke="#5B7A4A" strokeWidth="2" />
        <ellipse cx="25" cy="23" rx="4" ry="8" fill="#E8B931" opacity="0.85" />
        <ellipse cx="20" cy="30" rx="3" ry="6" fill="#E8B931" opacity="0.65" transform="rotate(-25 20 30)" />
        <ellipse cx="30" cy="30" rx="3" ry="6" fill="#E8B931" opacity="0.65" transform="rotate(25 30 30)" />
        <path d="M25 60 Q12 50 16 42" stroke="#5B7A4A" strokeWidth="1.5" fill="none" />
      </g>
      {/* Stalk 3 */}
      <g transform="translate(-5, 15)">
        <line x1="25" y1="105" x2="25" y2="35" stroke="#A3BF94" strokeWidth="1.8" />
        <ellipse cx="25" cy="33" rx="3.5" ry="7" fill="#D4A03A" opacity="0.8" />
        <ellipse cx="21" cy="39" rx="2.5" ry="5" fill="#D4A03A" opacity="0.6" transform="rotate(-15 21 39)" />
        <ellipse cx="29" cy="39" rx="2.5" ry="5" fill="#D4A03A" opacity="0.6" transform="rotate(15 29 39)" />
      </g>
    </svg>
  );
}

// ─── Farm Hut ──────────────────────────────
export function FarmHut({ className = '', size = 100, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} style={style} aria-hidden="true">
      {/* Thatched roof */}
      <path d="M10 50 L50 15 L90 50 Z" fill="#D4A03A" stroke="#B8882E" strokeWidth="1.5" />
      {/* Thatch lines */}
      <path d="M30 42 L50 22 L70 42" stroke="#B8882E" strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M20 48 L50 20 L80 48" stroke="#B8882E" strokeWidth="0.8" opacity="0.3" fill="none" />
      {/* Walls */}
      <rect x="20" y="50" width="60" height="40" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
      {/* Door */}
      <rect x="40" y="60" width="18" height="30" rx="8" fill="#8B6B4A" stroke="#5A3E20" strokeWidth="1.5" />
      {/* Door handle */}
      <circle cx="53" cy="77" r="1.5" fill="#D4A03A" />
      {/* Window */}
      <rect x="26" y="60" width="10" height="10" rx="1" fill="#87CEEB" stroke="#D4B98A" strokeWidth="1" opacity="0.8" />
      <line x1="31" y1="60" x2="31" y2="70" stroke="#D4B98A" strokeWidth="0.8" />
      <line x1="26" y1="65" x2="36" y2="65" stroke="#D4B98A" strokeWidth="0.8" />
    </svg>
  );
}

// ─── Flying Birds ──────────────────────────────
export function FlyingBirds({ className = '', size = 60, style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 60 30" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M5 18 Q10 10 15 15 Q20 10 25 18" stroke="#5A4A32" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M25 12 Q30 5 35 10 Q40 5 45 12" stroke="#5A4A32" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M40 20 Q43 15 46 18 Q49 15 52 20" stroke="#5A4A32" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

// ─── Sun with Rays ──────────────────────────────
export function SunRays({ className = '', size = 80, style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 50" fill="none" className={className} style={style} aria-hidden="true">
      {/* Sun body (half-circle, rising) */}
      <path d="M15 48 A25 25 0 0 1 65 48" fill="#E8B931" opacity="0.3" />
      <path d="M15 48 A25 25 0 0 1 65 48" stroke="#D4A03A" strokeWidth="2" fill="none" />
      {/* Rays */}
      <line x1="40" y1="48" x2="40" y2="5" stroke="#E8B931" strokeWidth="1.5" opacity="0.4" />
      <line x1="40" y1="48" x2="18" y2="12" stroke="#E8B931" strokeWidth="1.2" opacity="0.3" />
      <line x1="40" y1="48" x2="62" y2="12" stroke="#E8B931" strokeWidth="1.2" opacity="0.3" />
      <line x1="40" y1="48" x2="8" y2="30" stroke="#E8B931" strokeWidth="1" opacity="0.25" />
      <line x1="40" y1="48" x2="72" y2="30" stroke="#E8B931" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

// ─── Bullock Cart ──────────────────────────────
export function BullockCart({ className = '', size = 140, style = {} }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 140 75" fill="none" className={className} style={style} aria-hidden="true">
      {/* Cart body */}
      <rect x="55" y="25" width="50" height="25" rx="3" fill="#F5ECDA" stroke="#8B6B4A" strokeWidth="1.5" />
      {/* Hay in cart */}
      <path d="M58 25 Q70 15 82 25" fill="#D4A03A" opacity="0.5" />
      <path d="M72 25 Q84 18 96 25" fill="#D4A03A" opacity="0.4" />
      {/* Wheel */}
      <circle cx="75" cy="55" r="12" stroke="#8B6B4A" strokeWidth="2" fill="none" />
      <circle cx="75" cy="55" r="2" fill="#8B6B4A" />
      {/* Spokes */}
      <line x1="75" y1="43" x2="75" y2="67" stroke="#8B6B4A" strokeWidth="1" />
      <line x1="63" y1="55" x2="87" y2="55" stroke="#8B6B4A" strokeWidth="1" />
      <line x1="67" y1="47" x2="83" y2="63" stroke="#8B6B4A" strokeWidth="1" />
      <line x1="83" y1="47" x2="67" y2="63" stroke="#8B6B4A" strokeWidth="1" />
      {/* Shaft */}
      <line x1="55" y1="42" x2="20" y2="35" stroke="#8B6B4A" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="46" x2="20" y2="40" stroke="#8B6B4A" strokeWidth="2" strokeLinecap="round" />
      {/* Bullock outline */}
      <ellipse cx="15" cy="30" rx="14" ry="12" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
      <circle cx="5" cy="24" r="6" fill="#F5ECDA" stroke="#D4B98A" strokeWidth="1.5" />
      <path d="M2 20 Q-1 12 4 15" stroke="#8B6B4A" strokeWidth="1.2" fill="none" />
      <path d="M8 20 Q11 12 6 15" stroke="#8B6B4A" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="23" r="1" fill="#3B2F1E" />
      {/* Legs */}
      <line x1="8" y1="40" x2="8" y2="55" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="41" x2="14" y2="55" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="41" x2="20" y2="55" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="40" x2="24" y2="55" stroke="#D4B98A" strokeWidth="2" strokeLinecap="round" />
      {/* Ground line */}
      <line x1="0" y1="67" x2="140" y2="67" stroke="#A3BF94" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// ─── Tree Silhouette ──────────────────────────────
export function TreeSilhouette({ className = '', size = 80, style = {} }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 100" fill="none" className={className} style={style} aria-hidden="true">
      {/* Trunk */}
      <rect x="35" y="55" width="10" height="40" rx="3" fill="#8B6B4A" opacity="0.7" />
      {/* Canopy */}
      <ellipse cx="40" cy="38" rx="30" ry="28" fill="#5B7A4A" opacity="0.25" />
      <ellipse cx="30" cy="32" rx="18" ry="20" fill="#5B7A4A" opacity="0.2" />
      <ellipse cx="52" cy="35" rx="16" ry="18" fill="#5B7A4A" opacity="0.2" />
      {/* Branch detail */}
      <path d="M40 55 Q25 40 22 30" stroke="#8B6B4A" strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M40 55 Q55 42 58 32" stroke="#8B6B4A" strokeWidth="1.5" opacity="0.4" fill="none" />
    </svg>
  );
}

// ─── Leaf / Vine Branch ──────────────────────────────
export function LeafBranch({ className = '', size = 100, style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" className={className} style={style} aria-hidden="true">
      {/* Main vine */}
      <path d="M5 50 Q25 45 40 35 Q55 25 70 28 Q85 30 95 20" stroke="#7BA468" strokeWidth="2" fill="none" />
      {/* Leaves along the vine */}
      <ellipse cx="25" cy="42" rx="6" ry="10" fill="#A3BF94" opacity="0.5" transform="rotate(-30 25 42)" />
      <ellipse cx="45" cy="32" rx="5" ry="9" fill="#7BA468" opacity="0.4" transform="rotate(-20 45 32)" />
      <ellipse cx="65" cy="26" rx="5" ry="8" fill="#A3BF94" opacity="0.45" transform="rotate(10 65 26)" />
      <ellipse cx="85" cy="22" rx="4" ry="7" fill="#7BA468" opacity="0.35" transform="rotate(20 85 22)" />
      {/* Small berry dots */}
      <circle cx="32" cy="38" r="2" fill="#C2714F" opacity="0.6" />
      <circle cx="55" cy="28" r="1.8" fill="#C2714F" opacity="0.5" />
      <circle cx="78" cy="25" r="1.5" fill="#C2714F" opacity="0.4" />
    </svg>
  );
}

// ─── Ground/Horizon Line ──────────────────────────────
export function GroundHorizon({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 1440 200"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      style={{ width: '100%', display: 'block', ...style }}
      aria-hidden="true"
    >
      {/* Far hills */}
      <path
        d="M0 140 Q120 80 240 120 Q360 60 500 110 Q640 50 780 100 Q920 60 1060 95 Q1200 55 1320 100 Q1380 80 1440 110 V200 H0Z"
        fill="#A3BF94"
        opacity="0.3"
      />
      {/* Mid hills */}
      <path
        d="M0 160 Q180 110 360 140 Q540 100 720 130 Q900 95 1080 125 Q1260 100 1440 135 V200 H0Z"
        fill="#7BA468"
        opacity="0.4"
      />
      {/* Foreground ground */}
      <path
        d="M0 175 Q200 150 400 165 Q600 145 800 160 Q1000 148 1200 162 Q1350 155 1440 168 V200 H0Z"
        fill="#5B7A4A"
        opacity="0.6"
      />
      {/* Grass line */}
      <path
        d="M0 185 Q100 178 200 182 Q400 175 600 180 Q800 174 1000 179 Q1200 176 1440 182 V200 H0Z"
        fill="#4A6B3A"
      />
    </svg>
  );
}
