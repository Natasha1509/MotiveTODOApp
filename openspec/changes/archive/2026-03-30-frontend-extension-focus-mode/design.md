# Design: frontend-extension-focus-mode

## Context
Currently, the extension operates within a 400x600px popup. To meet the "Fullscreen" requirement and allow task additions, we need to transition to a full-tab view and integrate larger, interactive components.

## Architecture
- **Tab Transition**:
  - Use `chrome.tabs.create({ url: 'index.html' })` to open the React app in a dedicated browser tab.
  - In full-tab mode, the UI will adapt to a widescreen centered layout.
- **Fullscreen API Interface**:
  - A dedicated "Launch Focus Mode" handler that triggers the browser's native fullscreen mode on the document.
- **Component Interface**:
  - `AddTask`: A specialized input that identifies whether a task is "Boolean" (immediate goal) or "Timed" (requires countdown).
- **Timer Engine**:
  - A client-side interval that updates the current session's `timeSpentSeconds` and periodically syncs with the backend.

## Implementation
- **Layout Adaptation**: Use media queries or a "mode" state to switch between `Popup` and `FullTab` layouts.
- **Persistence**: Storage of the active task ID in `chrome.storage.local` to allow session recovery if the tab is accidentally closed.
- **Styling**: Large, readable typography for the focus timer, centered quote display, and a progress ring.

## Risks
- **Fullscreen Limitations**: The browser requires a user gesture (clicking a button) to enter fullscreen; we must incorporate this into the UI flow.
- **CORS for Full Tabs**: Since the extension origin is `chrome-extension://...`, we must ensure the backend allows CORS from this specific scheme.
