/**
 * WaveDivider.jsx
 * Organic wave/hill-shaped section divider — replaces straight horizontal lines
 * between sections with curved, countryside-feeling transitions.
 */

export default function WaveDivider({
  colorFrom = '#FDF6E3',
  colorTo = '#F4F7F0',
  flip = false,
  variant = 'wave',
  className = '',
}) {
  const paths = {
    wave: (
      <path
        d="M0,40 C120,80 240,0 360,50 C480,100 600,10 720,45 C840,80 960,20 1080,55 C1200,90 1320,30 1440,60 L1440,120 L0,120 Z"
        fill={colorTo}
      />
    ),
    hill: (
      <path
        d="M0,60 Q180,0 360,50 Q540,100 720,40 Q900,0 1080,55 Q1260,90 1440,45 L1440,120 L0,120 Z"
        fill={colorTo}
      />
    ),
    gentle: (
      <path
        d="M0,70 C360,30 720,90 1080,40 C1260,20 1380,55 1440,50 L1440,120 L0,120 Z"
        fill={colorTo}
      />
    ),
  };

  return (
    <div
      className={className}
      style={{
        background: colorFrom,
        lineHeight: 0,
        overflow: 'hidden',
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '60px', display: 'block' }}
      >
        {paths[variant] || paths.wave}
      </svg>
    </div>
  );
}
