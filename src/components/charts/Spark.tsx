/**
 * Zero-dependency inline-SVG sparkline components (Phase 14). Bars fill
 * `currentColor`, so the parent's text color sets the accent.
 */

const HEIGHT = 48;
const BAR_WIDTH = 12;
const GAP = 3;

type SparkBarsProps = {
  values: number[];
  labels?: string[];
  ariaLabel: string;
};

export function SparkBars({ values, labels, ariaLabel }: SparkBarsProps) {
  if (values.length === 0) return null;
  const max = Math.max(1, ...values);
  const width = values.length * (BAR_WIDTH + GAP) - GAP;
  const entry = (i: number) => (labels?.[i] ? `${labels[i]}: ${values[i]}` : String(values[i]));
  return (
    <div>
      <svg
        role="img"
        aria-label={ariaLabel}
        width={width}
        height={HEIGHT}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        className="max-w-full"
      >
        {values.map((v, i) => {
          const barHeight = v <= 0 ? 2 : Math.max(2, Math.round((v / max) * HEIGHT));
          return (
            <rect
              key={i}
              x={i * (BAR_WIDTH + GAP)}
              y={HEIGHT - barHeight}
              width={BAR_WIDTH}
              height={barHeight}
              rx={1.5}
              fill="currentColor"
              fillOpacity={0.7}
            >
              <title>{entry(i)}</title>
            </rect>
          );
        })}
      </svg>
      <span className="sr-only">{values.map((_, i) => entry(i)).join(", ")}</span>
    </div>
  );
}
