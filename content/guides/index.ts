import type { Guide } from "@/content-schema/food";
import allergens101 from "./allergens-101";
import howFast from "./how-fast";
import milkAndSolids from "./milk-and-solids";
import ordering from "./ordering";
import whenToStart from "./when-to-start";
import whySolids from "./why-solids";

/** Aggregated Learn chapters (Phase 9), in reading order. */
export const allGuides: Guide[] = [whySolids, whenToStart, howFast, allergens101, milkAndSolids, ordering];

export const guideBySlug = new Map(allGuides.map((g) => [g.slug, g]));
