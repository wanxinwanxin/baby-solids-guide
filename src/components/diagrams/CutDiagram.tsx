import type { JSX } from "react";

/**
 * Original parametric cut diagrams (ROADMAP §6.4) — top-down "make this
 * shape" illustrations. Drawn with currentColor so they adapt to theme;
 * the dashed lines are the cuts, the hatched areas are grip zones.
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

const cut = { strokeDasharray: "6 4", strokeWidth: 2 } as const;

const ART: Record<DiagramVariant, JSX.Element> = {
  batons: (
    <g fill="currentColor" stroke="currentColor">
      <rect x="30" y="20" width="26" height="80" rx="10" fillOpacity="0.15" strokeWidth="2" />
      <rect x="72" y="20" width="26" height="80" rx="10" fillOpacity="0.15" strokeWidth="2" />
      {/* two-finger scale reference */}
      <rect x="130" y="24" width="16" height="72" rx="8" fillOpacity="0.35" stroke="none" />
      <rect x="150" y="28" width="16" height="68" rx="8" fillOpacity="0.35" stroke="none" />
      <text x="138" y="114" fontSize="10" stroke="none" fillOpacity="0.8">2 fingers</text>
    </g>
  ),
  "bite-size": (
    <g fill="currentColor" stroke="currentColor">
      {[
        [40, 35], [70, 30], [100, 38], [55, 62], [85, 58], [115, 64], [45, 88], [75, 86], [105, 90],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="14" height="12" rx="4" fillOpacity="0.2" strokeWidth="1.5" />
      ))}
      <circle cx="155" cy="60" r="7" fillOpacity="0.35" stroke="none" />
      <text x="140" y="82" fontSize="10" stroke="none" fillOpacity="0.8">pinky nail</text>
    </g>
  ),
  "quarter-lengthwise": (
    <g fill="currentColor" stroke="currentColor">
      <ellipse cx="60" cy="60" rx="26" ry="38" fillOpacity="0.15" strokeWidth="2" />
      <line x1="60" y1="20" x2="60" y2="100" {...cut} />
      <line x1="38" y1="60" x2="82" y2="60" {...cut} />
      {/* the four resulting spears */}
      {[118, 136, 154, 172].map((x, i) => (
        <path key={i} d={`M ${x} 30 q 8 30 0 60 q -4 -30 0 -60`} fillOpacity="0.25" strokeWidth="1.5" />
      ))}
      <text x="112" y="112" fontSize="10" stroke="none" fillOpacity="0.8">4 long spears</text>
    </g>
  ),
  "thin-spread": (
    <g fill="currentColor" stroke="currentColor">
      <rect x="28" y="50" width="90" height="44" rx="6" fillOpacity="0.1" strokeWidth="2" />
      <path d="M 34 58 q 20 -6 78 -2" strokeWidth="3" fill="none" strokeOpacity="0.5" />
      <text x="30" y="112" fontSize="10" stroke="none" fillOpacity="0.8">see-through layer</text>
      {/* drizzle off a spoon */}
      <ellipse cx="152" cy="34" rx="14" ry="8" fillOpacity="0.25" strokeWidth="1.5" />
      <path d="M 152 42 q -4 18 2 30 q 4 10 -2 18" fill="none" strokeWidth="2" strokeOpacity="0.6" />
    </g>
  ),
  strips: (
    <g fill="currentColor" stroke="currentColor">
      <rect x="35" y="28" width="110" height="66" rx="6" fillOpacity="0.12" strokeWidth="2" />
      <line x1="72" y1="28" x2="72" y2="94" {...cut} />
      <line x1="108" y1="28" x2="108" y2="94" {...cut} />
      <text x="52" y="112" fontSize="10" stroke="none" fillOpacity="0.8">finger-width strips</text>
    </g>
  ),
  mash: (
    <g fill="currentColor" stroke="currentColor">
      <path d="M 40 55 h 100 q 2 34 -50 36 q -52 -2 -50 -36 z" fillOpacity="0.12" strokeWidth="2" />
      <path d="M 50 55 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0" fill="none" strokeWidth="2" strokeOpacity="0.6" />
      <text x="52" y="110" fontSize="10" stroke="none" fillOpacity="0.8">smooth &amp; spoonable</text>
    </g>
  ),
  shred: (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6">
      <path d="M 45 40 q 20 8 40 2" />
      <path d="M 60 52 q 24 10 44 0" />
      <path d="M 40 62 q 26 8 52 4" />
      <path d="M 55 74 q 20 10 46 2" />
      <path d="M 48 86 q 24 6 44 4" />
      <text x="50" y="110" fontSize="10" stroke="none" fill="currentColor" fillOpacity="0.8">
        fine, moist shreds
      </text>
    </g>
  ),
  ribbons: (
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.4">
      <path d="M 40 34 q 30 14 90 4" />
      <path d="M 36 58 q 40 16 100 2" />
      <path d="M 42 82 q 34 12 92 6" />
      <text x="48" y="110" fontSize="10" stroke="none" fill="currentColor" fillOpacity="0.8" strokeWidth="0">
        paper-thin ribbons
      </text>
    </g>
  ),
  "wedge-handle": (
    <g fill="currentColor" stroke="currentColor">
      <path d="M 70 22 q 34 6 36 76 l -36 8 q -20 -40 0 -84 z" fillOpacity="0.15" strokeWidth="2" />
      {/* hatched grip zone (skin/peel left on) */}
      <path d="M 70 78 q 16 -2 34 12 l -34 16 q -8 -14 0 -28 z" fillOpacity="0.35" strokeWidth="1" />
      <line x1="66" y1="86" x2="102" y2="96" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="66" y1="94" x2="100" y2="103" strokeWidth="1" strokeOpacity="0.6" />
      <text x="118" y="96" fontSize="10" stroke="none" fillOpacity="0.8">grip zone</text>
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
        className="w-full max-w-[220px] text-emerald-700 dark:text-emerald-400"
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
