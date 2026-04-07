# Proposal: frontend-extension-focus-mode

## Goal
To transform the current read-only task viewer into an interactive productivity tool by adding task creation capabilities and a dedicated, fullscreen "Focus Mode" that eliminates browser-level distractions.

## Scope
- **Interactive Task Management**:
  - Implement an `AddTask` form in the main Dashboard.
  - Support both "Simple" (Boolean) and "Timed" tasks via the backend `POST /api/tasks` endpoint.
- **Fullscreen Focus Mode**:
  - Implement a "Launch Focus" feature that opens the extension in a dedicated Chrome tab.
  - Integrate the browser's Fullscreen API to occupy the entire monitor.
  - Design a high-impact, minimalist UI specifically optimized for large screens.
- **Timer Logic**:
  - Implement the countdown logic for timed tasks during a Focus Session.

## Motivation
The current popup-only view is size-restricted by Chrome (max 800x600px) and lacks input capabilities. To truly "wow" the user and provide a focused environment, we need a fullscreen experience that shields the user from their browser tabs and OS distractions.
