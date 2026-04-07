# Design: frontend-extension-core

## Context
Having established a robust backend API (Phase 2), we now move to the frontend implementation. The app will be a Chrome Extension designed for high productivity and focus.

## Architecture
- **Environment**: Chrome Extension (Manifest V3).
- **Frontend Framework**: React 18+ with TypeScript and Vite.
- **Components**:
  - `Popup`: The primary entry point.
  - `Background Service Worker`: (Optional) Currently not required for core features but available for future site-blocking logic.
- **Communication Layer**:
  - `Fetch API`: Communicating with `localhost:8080`.
  - `chrome.storage.local`: Persistent storage for the JWT token.
- **Data Synchronization**:
  - App state loads from storage on open.
  - CRUD operations update the backend and local state.

## Implementation
- **Styling**: Vanilla CSS with a focus on Glassmorphism and Dark Mode.
- **Authentication**: JWT handling via `Authorization: Bearer <token>` in all protected API calls.
- **Build System**: Vite configured to produce an unpacked extension (`dist` folder).

## Risks
- **CORS Issues**: Needs careful `host_permissions` in `manifest.json`.
- **Extension Lifetime**: Popup state is lost when closed, hence the absolute necessity of `chrome.storage.local`.
- **Backend Availability**: The extension will show a "Server Unreachable" state if the backend is not running.
