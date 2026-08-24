/**
 * The "open cut" mark (design sheet 01, candidate A): a whole food, the
 * dashed knife path, and the freed quarter — the brand and the cut-diagram
 * system share one visual idea. Token-driven so it holds in both themes.
 */
export function BrandMark({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 78 64"
      width={size}
      height={(size * 64) / 78}
      aria-hidden="true"
      className={className}
    >
      <circle cx="26" cy="32" r="23" fill="var(--diagram-fill)" stroke="var(--primary)" strokeWidth="4" />
      <line x1="26" y1="10" x2="26" y2="54" stroke="var(--primary)" strokeWidth="3.5" strokeDasharray="6 5" />
      <path d="M 50 32 L 50 10 A 22 22 0 0 1 72 32 Z" fill="var(--primary)" />
    </svg>
  );
}
