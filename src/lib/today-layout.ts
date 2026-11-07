/**
 * The cards on Full day Today, and the order and visibility that a device
 * chose for them (user feedback, 2026-10-28; design/today-widgets.md).
 *
 * Pure module: the store keeps the saved layout, and the page reads it
 * through normalizeTodayLayout.
 */

/** All cards, in the default order. */
export const TODAY_WIDGET_IDS = [
  "progress",
  "todo",
  "solids",
  "sleep",
  "feeding",
  "diapers",
  "activities",
] as const;

export type TodayWidgetId = (typeof TODAY_WIDGET_IDS)[number];

/** The small stat cards. Stat cards that come one after the other share one grid. */
export const STAT_WIDGETS: ReadonlySet<TodayWidgetId> = new Set([
  "solids",
  "sleep",
  "feeding",
  "diapers",
  "activities",
]);

export type TodayLayout = { order: TodayWidgetId[]; hidden: TodayWidgetId[] };

export const DEFAULT_TODAY_LAYOUT: TodayLayout = { order: [...TODAY_WIDGET_IDS], hidden: [] };

const isWidgetId = (id: unknown): id is TodayWidgetId =>
  typeof id === "string" && (TODAY_WIDGET_IDS as readonly string[]).includes(id);

/**
 * A complete, valid layout from whatever the device saved. Unknown ids go
 * away. A card that the saved order does not have (a card that a later
 * release added) goes in after the card that comes before it in the default
 * order, so it shows in a sensible place.
 */
export function normalizeTodayLayout(
  saved?: { order?: unknown; hidden?: unknown } | null,
): TodayLayout {
  const order: TodayWidgetId[] = [];
  for (const id of Array.isArray(saved?.order) ? saved.order : []) {
    if (isWidgetId(id) && !order.includes(id)) order.push(id);
  }
  TODAY_WIDGET_IDS.forEach((id, i) => {
    if (order.includes(id)) return;
    const before = TODAY_WIDGET_IDS.slice(0, i).findLast((prev) => order.includes(prev));
    order.splice(before ? order.indexOf(before) + 1 : 0, 0, id);
  });
  const hidden = TODAY_WIDGET_IDS.filter(
    (id) => Array.isArray(saved?.hidden) && saved.hidden.includes(id),
  );
  return { order, hidden };
}

/** Move one card up (-1) or down (+1). A move past either end does nothing. */
export function moveWidget(layout: TodayLayout, id: TodayWidgetId, delta: -1 | 1): TodayLayout {
  const order = [...layout.order];
  const from = order.indexOf(id);
  const to = from + delta;
  if (from < 0 || to < 0 || to >= order.length) return layout;
  [order[from], order[to]] = [order[to], order[from]];
  return { ...layout, order };
}

/** Show a hidden card, or hide a visible card. */
export function toggleWidget(layout: TodayLayout, id: TodayWidgetId): TodayLayout {
  const hidden = layout.hidden.includes(id)
    ? layout.hidden.filter((h) => h !== id)
    : TODAY_WIDGET_IDS.filter((w) => w === id || layout.hidden.includes(w));
  return { ...layout, hidden };
}

export type LayoutBlock =
  | { kind: "card"; id: TodayWidgetId }
  /** Stat cards that come one after the other. `first` marks the first grid on the page. */
  | { kind: "stats"; ids: TodayWidgetId[]; first: boolean };

/** The visible cards in order, with neighboring stat cards grouped into one grid. */
export function layoutBlocks(layout: TodayLayout): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];
  let sawStats = false;
  for (const id of layout.order) {
    if (layout.hidden.includes(id)) continue;
    const last = blocks.at(-1);
    if (!STAT_WIDGETS.has(id)) blocks.push({ kind: "card", id });
    else if (last?.kind === "stats") last.ids.push(id);
    else {
      blocks.push({ kind: "stats", ids: [id], first: !sawStats });
      sawStats = true;
    }
  }
  return blocks;
}
