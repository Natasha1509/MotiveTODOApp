## ADDED Requirements

### Requirement: Unified Header Actions
- **GIVEN** A user on the dashboard.
- **WHEN** They view the top header.
- **THEN** The actions [Refresh] and [Full Screen] are displayed alongside [Logout].
- **THEN** The redundant "Your Tasks" <h2> section is absent.

### Requirement: MotiveTODO Branding
- **GIVEN** The app name display.
- **WHEN** Rendering the main title.
- **THEN** It displays "MOTIVE TODO" (or MotiveTODO) with stylized accent coloring.
- **THEN** This replaces all occurrences of "Focus Todo".

### Requirement: Vertical Optimization
- **GIVEN** A small extension window (450px wide).
- **WHEN** Consolidating the header.
- **THEN** It must occupy no more than 60px of vertical space, providing immediate visibility to the task list.
