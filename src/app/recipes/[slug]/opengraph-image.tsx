import { ImageResponse } from "next/og";
import { recipeBySlug } from "../../../../content/recipes";
import { BRAND } from "@/lib/brand";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Baby-safe recipe card";

// Crawlers and link unfurlers send no locale cookie, so this card is English
// on purpose, like the per-food card.
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = recipeBySlug.get(slug);
  const name = recipe?.name ?? "Recipe";
  const bands = recipe?.bands.join(" · ") ?? "";
  const why = recipe?.whyItWorks ?? "";

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
          <div style={{ fontSize: 28, opacity: 0.85 }}>{`recipe · ${bands}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.05 }}>{name}</div>
          <div style={{ fontSize: 34, lineHeight: 1.4, opacity: 0.95, maxWidth: 1000 }}>
            {why.length > 180 ? `${why.slice(0, 177)}…` : why}
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
