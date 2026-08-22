"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md border px-3 py-1.5 text-sm hover:border-emerald-400 print:hidden"
    >
      🖨 Print
    </button>
  );
}
