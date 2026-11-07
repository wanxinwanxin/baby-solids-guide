# Full day Today: choose your cards

Status: design for build, 2026-11-06.

## Problem

Feedback on 2026-10-28 asked for a home page made of widgets. Each family wants to pick the widgets that it uses and to hide the other widgets. For example, a family that breastfeeds and does not log diapers sees an empty "Diapers" card every day.

## Scope

This design changes the Full day Today view (`src/app/today/FullDayToday.tsx`). The Full day view is the home page for families who log the whole day. The solids-first Today and the caregiver view do not change in this release.

## Cards

The page has a fixed header (greeting, date, History and Plan links). Below the header, the page shows seven cards in this default order:

| id | Card |
| --- | --- |
| `progress` | Day progress bar (solids and activities goal) |
| `todo` | To do today (the plan food and the suggested foods) |
| `solids` | Solids eaten today |
| `sleep` | Sleep today and the next window |
| `feeding` | Bottles and breastfeeds today |
| `diapers` | Diapers today |
| `activities` | Activities today |

## Behavior

1. A "Customize" link in the header opens the edit mode.
2. The edit mode shows one row for each card, in the current order. Each row has a show/hide switch and two buttons: "Move up" and "Move down".
3. Each change applies at once. "Done" closes the edit mode. "Reset" restores the default order and shows all cards.
4. The page shows the visible cards in the saved order. Two or more stat cards (`solids` to `activities`) that come one after the other share one two-column grid. The "Done today" heading shows above the first stat-card grid.
5. When all cards are hidden, the page shows one line with a link to the edit mode.
6. A hidden card does not change data, reminders, or the day progress goal.

## Storage

The layout is a device setting in the guide store: `todayLayout: { order, hidden }`. It persists in local storage with `fullDayMode` and does not sync. Each parent has a phone and can need different cards, so the setting belongs to the device.

The app reads the saved layout through `normalizeTodayLayout`. This function removes unknown ids and adds missing ids in their default position. Thus a card that a later release adds shows up, and a removed card does not break the page.

## Walk-through

Families already know the Full day view, so a short tip is sufficient. A one-time tip card shows at the top of Full day Today: "New: choose your cards." It has two buttons, "Customize" and "Got it". Each button closes the tip for good on that device (`dismissedNotices` key `tip:today-layout`). "Customize" also opens the edit mode.

## Out of scope

- Drag-and-drop. The move buttons work on all phones and with screen readers.
- New cards, for example an allergen card or a weekly menu card. The id list makes this easy in a later release.
- A synced, family-wide layout.
