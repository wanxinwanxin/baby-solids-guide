import type { Locale } from "@/lib/i18n/config";

/**
 * Client for /api/feedback. Feedback and food requests are collected on the
 * server (a row + an email to the owner) so they can be reviewed daily. All
 * calls are best-effort: a failure never blocks what the parent was doing.
 */

export type FeedbackCategory = "general" | "idea" | "bug" | "food-request";

export type FeedbackInput = {
  category: FeedbackCategory;
  message: string;
  /** The parent's email, only if they want a reply. Optional. */
  email?: string;
  /** The page they were on, for context. */
  page?: string;
  locale?: Locale;
};

export async function submitFeedback(input: FeedbackInput): Promise<boolean> {
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        page: input.page ?? (typeof location !== "undefined" ? location.pathname : undefined),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Fire-and-forget signal that a food is missing from the database. */
export function reportFoodRequest(name: string, locale: Locale): void {
  void submitFeedback({
    category: "food-request",
    message: `Food request (added as a custom food): ${name}`,
    locale,
  });
}
