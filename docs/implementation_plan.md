# Todo App Implementation Plan

This document outlines the design and roadmap for our focus-first Todo Application.

## Architecture Overivew

1. **Frontend: React Chrome Extension**
   - **Framework**: Vite + React + TypeScript
   - **Extension Standard**: Manifest V3
   - **Blocking**: Fullscreen Focus Mode via `fullscreenchange` API.
2. **Backend: Java Spring Boot API** (✅ Verified Complete)
   - **Auth**: JWT-based (Spring Security 6)
   - **Storage**: H2 Database (In-memory)
   - **Seeding**: Motivational quotes seeded on startup.

---

## Phase Status Summary

### `[x]` Phase 1: Scaffolding
- Backend and Frontend projects initialized.
- Directory structure set.

### `[x]` Phase 2: Backend APIs (Verified)
- **Authentication**: Register/Login endpoints returning JWTs.
- **Task Management**: CRUD for time-based and boolean tasks.
- **Quote Service**: Random quote generator for focus sessions.
- **Build Fixes**: Resolved Spring Security 6 & Lombok compatibility issues.

### `[ ]` Phase 3: Frontend Extension Core (Up Next)
1. **Manifest V3 Setup**: Configure `manifest.json` to handle permissions and popup UI.
2. **Build Pipeline**: Adjust Vite config to output an unpacked Chrome Extension.
3. **Auth UI**: Build the login/register forms using CSS-in-JS or Vanilla CSS.
4. **Task List**: Implement the main view to fetch and display tasks from the backend.

### `[ ]` Phase 4: Focus Mode & Motivation Integration
- **Timer Logic**: Implement the countdown for time-based tasks.
- **Fullscreen Blocking**: Handle focus mode with automatic pause on exit.
- **Quote Display**: Fetch and show a new quote for every session.

---

## Verification Plan

### Manual Verification
1. Run `npm run build` and load the `dist` folder into `chrome://extensions`.
2. Verify the popup displays the branding and Login screen correctly.
3. Test a login to ensure the token is saved in `chrome.storage.local` and the session persists.

### Automated Checks
- Verify `manifest.json` is correctly formed.
- Use `fetch` debugging to confirm backend communication (CORS verification).
