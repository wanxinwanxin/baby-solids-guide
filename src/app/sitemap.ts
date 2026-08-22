import type { MetadataRoute } from "next";
import { allFoods } from "../../content/foods";
import { allergenPrograms } from "../../content/allergens";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/foods`, priority: 0.9 },
    { url: `${BASE}/safety`, priority: 0.8 },
    { url: `${BASE}/allergens`, priority: 0.8 },
    { url: `${BASE}/about`, priority: 0.5 },
    ...allFoods.map((f) => ({ url: `${BASE}/foods/${f.slug}`, priority: 0.7 })),
    ...allergenPrograms.map((p) => ({ url: `${BASE}/allergens/${p.id}`, priority: 0.7 })),
  ];
}
