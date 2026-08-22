import type { Metadata } from "next";
import { PlanBoard } from "./PlanBoard";

export const metadata: Metadata = {
  title: "Introduction plan",
  description:
    "Drag foods onto a 12-week timeline. Iron early and allergens one at a time are the science; the rest of the order is yours.",
};

export default function PlanPage() {
  return <PlanBoard />;
}
