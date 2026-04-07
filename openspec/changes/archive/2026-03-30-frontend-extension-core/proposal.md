# Proposal: frontend-extension-core

## Goal
Build the core frontend for the Motivational Todo App as a Chrome Extension (Manifest V3) using React, TypeScript, and Vite. The focus is on creating a premium, dark-themed user interface that facilitates task management and focus mode integration.

## Scope
- **Chrome Extension Setup**: Manifest V3 configuration, permissions, and build pipeline.
- **Authentication UI**: Login and Registration screens with persistent session management via `chrome.storage.local`.
- **Task Management UI**: Main dashboard for viewing, creating, and updating tasks (boolean and time-based).
- **Motivational Integration**: Displaying random quotes fetched from the backend.
- **Styling**: Implementation of a "Wow" factor design (Dark Mode + Glassmorphism).

## Motivation
To provide a seamless, non-intrusive experience for users to manage their focus tasks directly from their browser. By utilizing a Chrome Extension, we can ensure the app is always one click away, and later integrate deeper browser-level focus features (like blocking sites).
