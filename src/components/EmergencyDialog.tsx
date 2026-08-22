"use client";

import type { TriageResult } from "@/lib/triage";

/**
 * Full-screen emergency interrupt (ROADMAP §2.2, §8.4). Deliberately not a
 * dismissable dialog component — it takes over the screen until acknowledged.
 */
export function EmergencyDialog({
  result,
  onAcknowledge,
}: {
  result: TriageResult;
  onAcknowledge: () => void;
}) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={result.headline}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-red-700 p-6 text-white"
    >
      <p className="text-center text-4xl font-extrabold">{result.headline}</p>
      <ul className="max-w-md space-y-3 text-lg">
        {result.actions.map((a) => (
          <li key={a}>• {a}</li>
        ))}
      </ul>
      <a href="tel:911" className="rounded-xl bg-white px-8 py-4 text-2xl font-bold text-red-700">
        Call 911
      </a>
      <button
        type="button"
        onClick={onAcknowledge}
        className="mt-4 rounded-md border border-white/60 px-4 py-2 text-sm underline-offset-2 hover:underline"
      >
        I understand — continue
      </button>
    </div>
  );
}
