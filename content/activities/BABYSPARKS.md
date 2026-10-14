The BabySparks collection is imported from the user-supplied
`babysparks summary.xlsx`, sheet `中英对照`, rows 8–200 (IDs 001–193).
English text and its existing Chinese translation are preserved as supplied.
It is separate from the original OpenSolids everyday ideas.

Regenerate with `python3 scripts/import-babysparks.py "babysparks summary.xlsx"`.
The workbook remains a local source file; the app reads the checked-in JSON.
The similarly named `BabySparks_Activities_EN_ZH.xlsx` has a different column
layout and is not the input to this importer.

IDs 001–093 belong to the 4–6 month catalog and 094–193 to 7–9 months.
These are source catalog groups, not personalized age eligibility rules.
The seven source categories map to the existing development-area filters.
Gross Motor entries log as exercise; other entries log as play and learning.
Each entry has a stable `babysparks-NNN` log identity, including numbered variants.

Goals, instructions, materials, timing, and available milestones remain
distinct fields. Missing milestone cards are omitted. The 36 added reminders
and their basis are displayed separately from BabySparks instructions.
