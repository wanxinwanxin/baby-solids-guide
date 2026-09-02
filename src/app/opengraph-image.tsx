import { ImageResponse } from "next/og";
import { allFoods } from "../../content/foods";
import { BRAND, BRAND_TAGLINE } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${BRAND} — ${BRAND_TAGLINE}`;

// Crawlers and link unfurlers send no locale cookie, so this card is English
// on purpose, like the per-food card.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#FBF8F3",
          color: "#1F2A24",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "#1E7A52",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, color: "#1E7A52" }}>{BRAND}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 1000 }}>
            Know exactly what to serve, and how.
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.4, color: "#4A5A50", maxWidth: 980 }}>
            Exact safe textures for every food, day-by-day plans, and allergen guidance — every
            claim cited.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 27, color: "#1E7A52", fontWeight: 600 }}>
          <div style={{ display: "flex" }}>{allFoods.length} foods</div>
          <div style={{ display: "flex", color: "#8A9890" }}>·</div>
          <div style={{ display: "flex" }}>free · no ads · open source</div>
          <div style={{ display: "flex", color: "#8A9890" }}>·</div>
          <div style={{ display: "flex" }}>opensolids.org</div>
        </div>
      </div>
    ),
    size,
  );
}
