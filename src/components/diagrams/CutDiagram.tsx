import type { JSX } from "react";

/**
 * Parametric cut diagrams in the "garden ledger" line language (design
 * sheet 02): ink 2.5px strokes, botanical fills, dashed green = the cut,
 * hatching = grip zone, honey outline = the adult-finger scale unit.
 * Colors come from --diagram-* tokens so both themes hold.
 */
export type DiagramVariant =
  | "batons"
  | "bite-size"
  | "quarter-lengthwise"
  | "thin-spread"
  | "strips"
  | "mash"
  | "shred"
  | "ribbons"
  | "wedge-handle";

export const DIAGRAM_CAPTIONS: Record<DiagramVariant, string> = {
  batons: "Soft stick, about two adult fingers",
  "bite-size": "Pinky-nail pieces for pincer grasp",
  "quarter-lengthwise": "Always quartered lengthwise — never coins",
  "thin-spread": "Paper-thin spread or drizzly-thin mix",
  strips: "Finger-width strips",
  mash: "Smooth, spoonable mash",
  shred: "Finely shredded and moist",
  ribbons: "Paper-thin peeler ribbons",
  "wedge-handle": "Wedge with a built-in grip handle",
};

const INK = "var(--diagram-ink)";
const FILL = "var(--diagram-fill)";
const FILL2 = "var(--diagram-fill-2)";
const CUT = "var(--diagram-cut)";
const SCALE = "var(--diagram-scale)";
const MUTED = "var(--diagram-muted)";

const cut = { stroke: CUT, strokeDasharray: "6 4", strokeWidth: 2.5, fill: "none" } as const;

function Label({ x, y, children, anchor }: { x: number; y: number; children: string; anchor?: "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="8.5"
      letterSpacing="0.08em"
      textAnchor={anchor}
      fill={MUTED}
      stroke="none"
      style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
    >
      {children.toUpperCase()}
    </text>
  );
}

/** Honey-outlined adult-finger scale unit. */
function Fingers({ x, y, h = 64, count = 2 }: { x: number; y: number; h?: number; count?: 1 | 2 }) {
  return (
    <g fill="none" stroke={SCALE} strokeWidth="2">
      <rect x={x} y={y} width="14" height={h} rx="7" />
      {count === 2 && <rect x={x + 18} y={y + 4} width="14" height={h - 8} rx="7" />}
    </g>
  );
}

const ART: Record<DiagramVariant, JSX.Element> = {
  batons: (
    <g>
      <rect x="30" y="20" width="24" height="78" rx="10" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <rect x="68" y="20" width="24" height="78" rx="10" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <Fingers x={132} y={24} h={68} />
      <Label x={132} y={110}>2 fingers</Label>
    </g>
  ),
  "bite-size": (
    <g>
      {[
        [40, 32], [70, 27], [100, 35], [55, 59], [85, 55], [115, 61], [45, 85], [75, 83], [105, 87],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="15" height="13" rx="4" fill={FILL} stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="157" cy="52" r="8" fill="none" stroke={SCALE} strokeWidth="2" />
      <Label x={143} y={76}>pinky nail</Label>
    </g>
  ),
  "quarter-lengthwise": (
    <g>
      <ellipse cx="58" cy="60" rx="26" ry="38" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <line x1="58" y1="20" x2="58" y2="100" {...cut} />
      <line x1="36" y1="60" x2="80" y2="60" {...cut} />
      {[116, 134, 152, 170].map((x, i) => (
        <path key={i} d={`M ${x} 28 q 8 32 0 62 q -5 -32 0 -62`} fill={FILL2} stroke={INK} strokeWidth="2" />
      ))}
      <Label x={112} y={110}>4 long spears</Label>
    </g>
  ),
  "thin-spread": (
    <g>
      <rect x="26" y="50" width="92" height="44" rx="8" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <path d="M 33 60 q 22 -7 78 -2" fill="none" stroke={FILL2} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="154" cy="32" rx="14" ry="8" fill={FILL2} stroke={INK} strokeWidth="2" />
      <path d="M 154 40 q -4 18 2 30 q 4 10 -2 18" fill="none" stroke={CUT} strokeWidth="2.5" strokeLinecap="round" />
      <Label x={28} y={110}>see-through layer</Label>
    </g>
  ),
  strips: (
    <g>
      <rect x="33" y="26" width="112" height="66" rx="8" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <line x1="70" y1="26" x2="70" y2="92" {...cut} />
      <line x1="107" y1="26" x2="107" y2="92" {...cut} />
      <Fingers x={158} y={28} h={62} count={1} />
      <Label x={34} y={110}>finger-width strips</Label>
    </g>
  ),
  mash: (
    <g>
      <path d="M 38 54 h 104 q 2 36 -52 38 q -54 -2 -52 -38 z" fill={FILL} stroke={INK} strokeWidth="2.5" />
      <path
        d="M 50 54 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0"
        fill="none"
        stroke={CUT}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Label x={52} y={110}>smooth &amp; spoonable</Label>
    </g>
  ),
  shred: (
    <g fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round">
      <path d="M 45 38 q 20 8 40 2" />
      <path d="M 60 50 q 24 10 44 0" />
      <path d="M 40 60 q 26 8 52 4" />
      <path d="M 55 72 q 20 10 46 2" />
      <path d="M 48 84 q 24 6 44 4" />
      <Label x={48} y={110}>fine, moist shreds</Label>
    </g>
  ),
  ribbons: (
    <g fill="none" strokeLinecap="round">
      <path d="M 40 32 q 30 14 90 4" stroke={FILL2} strokeWidth="7" />
      <path d="M 40 32 q 30 14 90 4" stroke={INK} strokeWidth="1.6" strokeOpacity="0.5" />
      <path d="M 36 58 q 40 16 100 2" stroke={FILL2} strokeWidth="7" />
      <path d="M 36 58 q 40 16 100 2" stroke={INK} strokeWidth="1.6" strokeOpacity="0.5" />
      <path d="M 42 84 q 34 12 92 6" stroke={FILL2} strokeWidth="7" />
      <path d="M 42 84 q 34 12 92 6" stroke={INK} strokeWidth="1.6" strokeOpacity="0.5" />
      <Label x={46} y={110}>paper-thin ribbons</Label>
    </g>
  ),
  "wedge-handle": (
    <g>
      <path d="M 68 20 q 36 6 38 78 l -38 8 q -21 -42 0 -86 z" fill={FILL} stroke={INK} strokeWidth="2.5" />
      {/* hatched grip zone — peel or skin left on for grip */}
      <path d="M 68 76 q 17 -2 36 14 l -36 16 q -9 -15 0 -30 z" fill={FILL2} stroke={INK} strokeWidth="1.6" />
      <line x1="64" y1="86" x2="102" y2="97" stroke={INK} strokeWidth="1.2" />
      <line x1="64" y1="94" x2="100" y2="104" stroke={INK} strokeWidth="1.2" />
      <Label x={118} y={96}>grip zone</Label>
    </g>
  ),
};

export function CutDiagram({
  variant,
  className,
  showCaption = true,
}: {
  variant: DiagramVariant;
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 200 120"
        role="img"
        aria-label={DIAGRAM_CAPTIONS[variant]}
        className="w-full max-w-[220px]"
      >
        {ART[variant]}
      </svg>
      {showCaption && (
        <figcaption className="text-xs text-muted-foreground">{DIAGRAM_CAPTIONS[variant]}</figcaption>
      )}
    </figure>
  );
}

export function isDiagramVariant(id: string | undefined): id is DiagramVariant {
  return !!id && id in ART;
}
