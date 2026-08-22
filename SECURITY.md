# Security policy

## Reporting a vulnerability

Open a GitHub security advisory on this repository (Security → Report a
vulnerability), or open an issue asking for a private contact if the report
is sensitive. Please include reproduction steps.

## Scope notes

- The app is local-first: without an account, all family data stays in the
  browser's storage and never reaches the server.
- With an account, the server stores the sign-in identity and the family's
  food-log snapshot, nothing else. `/api/sync` and `/api/account` are
  session-gated; cross-user access is covered by authorization tests in
  `src/lib/sync/sync.integration.test.ts`.
- `/api/reminders/run` is gated by the `CRON_SECRET` header.
- No third-party analytics or trackers, by policy (see /about).
