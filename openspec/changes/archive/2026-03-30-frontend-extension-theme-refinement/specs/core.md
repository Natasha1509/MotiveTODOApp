## ADDED Requirements

### Requirement: Frosted Glass Light Mode
- **GIVEN** A user on the dashboard.
- **WHEN** They toggle the theme to [Light].
- **THEN** The background transitions to a radial-gradient(circle at top right, #f1f5f9, #e2e8f0).
- **THEN** All glass panels (glass-card) update to a white translucent background (rgba(255, 255, 255, 0.6)).
- **THEN** Typography updates to high-contrast slate-gray (#1e293b).

### Requirement: Premium Iconography
- **GIVEN** The dashboard header.
- **WHEN** Rendering the Refresh and Fullscreen buttons.
- **THEN** Minimalist SVG icons (20x20px) are displayed instead of emojis.
- **THEN** Icons inherit the current text color and have a 0.6-0.8 opacity range for a premium feel.

### Requirement: Persistent Theme Preference
- **GIVEN** The user's choice of [Light] or [Dark] mode.
- **WHEN** They restart the browser or reopen the extension.
- **THEN** The last selected theme is automatically applied.
