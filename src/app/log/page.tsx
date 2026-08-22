import { Suspense } from "react";
import type { Metadata } from "next";
import { LogForm } from "./LogForm";

export const metadata: Metadata = { title: "Log a food" };

export default function LogPage() {
  return (
    <Suspense>
      <LogForm />
    </Suspense>
  );
}
