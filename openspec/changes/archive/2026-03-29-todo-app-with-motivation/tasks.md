# Implementation Tasks: todo-app-with-motivation

# Phase 2: Backend Core (Verified)

## Database Schema
- [x] Create `User`, `Task`, and `Quote` entities with Lombok `@Data`.
- [x] Seed the `quotes` table using `data.sql`.

## Authentication (JWT)
- [x] Implement `JwtUtil`, `CustomUserDetailsService`, and `JwtAuthenticationFilter`.
- [x] Configure `SecurityFilterChain` with `permitAll` for `/api/auth/**`.
- [x] Implement User Registration and Login endpoints.

## Task Management
- [x] Create `TaskService` and `TaskRepository`.
- [x] Implement CRUD operations in `TaskController`.
- [x] Add status/time-spent update logic for time-based tasks.

## Build Synchronization
- [x] Configure `maven-compiler-plugin` for Lombok processing.
- [x] Update `pom.xml` with correct Spring Boot 3/4 artifact IDs.

# Phase 3: Frontend Extension Core (Pending)

## Extension Environment
- [ ] Configure `manifest.json` for Manifest V3 extension.
- [ ] Setup `vite.config.ts` for multiple entry points if needed.

## User Interface
- [ ] Implement Dark Mode / Glassmorphism theme in `index.css`.
- [ ] Build Auth UI (Login/Register screens).
- [ ] Implement persistent JWT storage using `chrome.storage.local`.

## Backend Integration
- [ ] Connect `TaskList` to the Backend Tasks API.
- [ ] Connect `QuoteUI` to the Backend Quotes API.
