import type { Metadata } from "next";
import { ImportFlow } from "./ImportFlow";

export const metadata: Metadata = { title: "Import where you are" };

export default function ImportPage() {
  return <ImportFlow />;
}
