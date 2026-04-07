# Design: todo-app-with-motivation

## Context
The project is a Todo application designed to minimize distractions and enhance motivation. The backend has already been partially implemented and verified. It provides RESTful APIs for authentication, task management, and random quote retrieval.

## Architecture
- **System Components**:
  - **Backend**: Spring Boot 3/4 Application (REST API).
  - **Security**: Spring Security 6 with `JwtAuthenticationFilter`. Stateless JWT-based authentication.
  - **Database**: H2 in-memory database. Contains tables for `users`, `tasks`, and `quotes`.
  - **Frontend**: React Chrome Extension (Manifest V3) using Vite.
- **Data Models**:
  - **User**: id, username, password (hashed).
  - **Task**: id, title, type (BOOLEAN, TIME_BASED), status (TODO, IN_PROGRESS, DONE), targetTimeSeconds, timeSpentSeconds, user_id.
  - **Quote**: id, text, author.
- **Communication**:
  - RESTful communication over HTTP (localhost:8080).
  - Frontend uses `Authorization: Bearer <token>` header for protected routes.

## Implementation
- **Backend Stack**: Java (17/21), Spring Boot, Spring Data JPA, H2, Lombok, JJWT (JWT library).
- **Frontend Stack**: React, TypeScript, Vite.
- **Design Choices**: 
  - Vanilla CSS for styling (Glassmorphism + Dark Mode).
  - Use `chrome.storage.local` for persistent JWT storage in the extension.

## Risks
- **H2 Volatility**: Data is lost on server restart (intentional for development).
- **CORS**: Correct CORS configuration needed on the backend for extension domains (currently `*`).
- **Lombok Setup**: Requires explicit `annotationProcessorPaths` in `pom.xml` for Java 17+ (already configured).
