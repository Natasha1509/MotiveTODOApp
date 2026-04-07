# Proposal: todo-app-with-motivation

## Goal
Build a "focus-first" Todo Application with a browser extension frontend and a Java Spring Boot backend. The aim is to help users stay productive by blocking distractions through a "Focus Mode" that utilizes the Fullscreen API.

## Scope
- **Backend**: Java Spring Boot 3/4 REST API.
  - User Authentication (JWT-based).
  - Task Management (CRUD for boolean and time-based tasks).
  - Motivational Quote service (H2 database seeded with quotes).
- **Frontend**: React + TypeScript + Vite Chrome Extension (Manifest V3).
  - Authentication UI (Login/Register).
  - Task List management UI.
  - Focus Timer & Fullscreen mode implementation.
- **Motivational Engine**: Dynamic quote display integrated into the UI.

## Motivation
Standard todo apps are easily ignored. This app provides a psychological "lock-in" via focus mode and uses curated motivational quotes to encourage users to finish their sessions. It solves the problem of "tab-hopping" and distraction by providing a dedicated, fullscreen work environment.
