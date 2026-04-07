# Design: frontend-extension-motivetodo-rebrand

## Context
The current layout uses two separate headers for the app name and the task list section. This consumes significant vertical space in the extension popup. We will merge these into a single, unified action bar under the new **MotiveTODO** brand.

## Architecture
- **Header Unification**:
  - The `header` element in `Dashboard.tsx` will now host both the Brand and the Action group.
  - Layout: `flexbox` with `justify-content: space-between`.
- **Action Group**:
  - A sub-container for "Refresh", "Full Screen", and "Logout".
  - This allows the `h2` ("Your Tasks") to be safely removed while retaining all functionality.

## Implementation
- **MotiveTODO Styling**: 
  - Brand string: `MOTIVE<span style={{ color: 'var(--accent)' }}>TODO</span>`.
  - All occurrences in `Dashboard.tsx`, `App.tsx`, and `manifest.json` will be updated.
- **Header Layout (Dashboard.tsx)**:
  - Top bar now contains the brand and all three action buttons.
  - The task card starts immediately below the quote/adder section.

## Risks
- **Button Crowding**: Three buttons + Logout might be tight on small popups.
- **Mitigation**: Use icon-only or shortened labels on mobile/small-width views.
