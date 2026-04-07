## ADDED Requirements

### Requirement: Task Creation Form
- **GIVEN** A user is on the dashboard.
- **WHEN** They enter a task title and press "Add".
- **THEN** The backend `POST /api/tasks` is hit with the default `BOOLEAN` type.

### Requirement: Focus Mode Transition
- **GIVEN** A user in the extension popup.
- **WHEN** They click the "Launch Fullscreen Focus" button.
- **THEN** A new Chrome tab opens at `chrome-extension://[ID]/index.html`.

### Requirement: Fullscreen API Integration
- **GIVEN** The app is running in a full tab.
- **WHEN** The user initiates "Focus Mode".
- **THEN** The document requests fullscreen via the HTML5 API to fill the entire monitor.

### Requirement: Interactive Countdown
- **GIVEN** A `TIME_BASED` task in Focus Mode.
- **WHEN** The focus session is active.
- **THEN** The UI displays a live countdown timer until reaching zero.
