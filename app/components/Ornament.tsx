import { venue } from '../data/venue';

/** A centred rule with a lozenge at its middle — the book's section divider. */
export function Rule({ width = 120, tone = 'brass' }: { width?: number; tone?: 'brass' | 'ink' }) {
  const color = tone === 'brass' ? 'var(--color-brass)' : 'rgba(10,10,11,0.4)';
  return (
    <svg width={width} height="9" viewBox={`0 0 ${width} 9`} fill="none" aria-hidden="true">
      <line x1="0" y1="4.5" x2={width / 2 - 9} y2="4.5" stroke={color} strokeWidth="0.75" opacity="0.7" />
      <line x1={width / 2 + 9} y1="4.5" x2={width} y2="4.5" stroke={color} strokeWidth="0.75" opacity="0.7" />
      <path d={`M${width / 2} 0.5 L${width / 2 + 4} 4.5 L${width / 2} 8.5 L${width / 2 - 4} 4.5 Z`} fill={color} />
    </svg>
  );
}

/** Flat hairline used under running heads, where a lozenge would be fussy. */
export function Hairline({ width = 64, tone = 'brass' }: { width?: number; tone?: 'brass' | 'ink' }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width,
        height: 1,
        background: tone === 'brass' ? 'var(--color-brass)' : 'rgba(10,10,11,0.35)',
        opacity: 0.8,
      }}
    />
  );
}

/** The house mark: initials inside a thin brass rectangle. */
export function Monogram({ size = 56, tone = 'brass' }: { size?: number; tone?: 'brass' | 'ink' }) {
  const color = tone === 'brass' ? 'var(--color-brass)' : 'var(--color-obsidian)';
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="54.5" height="54.5" stroke={color} strokeWidth="0.75" opacity="0.55" />
      <rect x="4.75" y="4.75" width="46.5" height="46.5" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <text
        x="28"
        y="35"
        textAnchor="middle"
        fill={color}
        style={{ font: '400 19px var(--font-display)', letterSpacing: '0.14em' }}
      >
        {venue.monogram}
      </text>
    </svg>
  );
}

/** Corner filigree for the cover — four thin brass brackets. */
export function CornerBrackets({ inset = 26, length = 46 }: { inset?: number; length?: number }) {
  const corners = [
    { x: inset, y: inset, dx: 1, dy: 1 },
    { x: 720 - inset, y: inset, dx: -1, dy: 1 },
    { x: inset, y: 1000 - inset, dx: 1, dy: -1 },
    { x: 720 - inset, y: 1000 - inset, dx: -1, dy: -1 },
  ];
  return (
    <svg
      viewBox="0 0 720 1000"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 3 }}
    >
      {corners.map((c, i) => (
        <path
          key={i}
          d={`M${c.x} ${c.y + c.dy * length} L${c.x} ${c.y} L${c.x + c.dx * length} ${c.y}`}
          stroke="var(--color-brass)"
          strokeWidth="0.9"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}
