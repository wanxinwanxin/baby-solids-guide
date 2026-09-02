import { ImageResponse } from "next/og";
import { foodBySlug } from "../../../../content/foods";
import { BRAND } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Safe first-serve texture card";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const food = foodBySlug.get(slug);
  const name = food?.name ?? "Food guide";
  const form = food?.prepSpecs[0]?.form ?? "";
  const band = food?.prepSpecs[0]?.band ?? "6-8m";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#047857",
          color: "#ecfdf5",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{BRAND}</div>
          <div style={{ fontSize: 28, opacity: 0.85 }}>{`safe texture · ${band}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* satori rejects elements with 2+ child nodes unless display is
              explicit — keep the emoji and name as ONE text child. */}
          <div style={{ fontSize: 84, fontWeight: 700 }}>
            {food?.emoji ? `${food.emoji} ${name}` : name}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.4, opacity: 0.95, maxWidth: 1000 }}>
            {form.length > 180 ? `${form.slice(0, 177)}…` : form}
          </div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.8 }}>
          Free, science-based, texture-first — every claim cited.
        </div>
      </div>
    ),
    size,
  );
}
