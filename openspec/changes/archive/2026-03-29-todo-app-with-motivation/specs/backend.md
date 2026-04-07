## ADDED Requirements

### Requirement: User Registration
- **GIVEN** A new user provides a unique username and password.
- **WHEN** They POST to `/api/auth/register`.
- **THEN** A new user is created in the database, and a success message is returned.

### Requirement: User Login
- **GIVEN** An existing user provides correct credentials.
- **WHEN** They POST to `/api/auth/login`.
- **THEN** A valid JWT token is returned in the response.

### Requirement: Task List Retrieval
- **GIVEN** An authenticated user with existing tasks.
- **WHEN** They GET from `/api/tasks`.
- **THEN** A JSON list of only their tasks is returned.

### Requirement: Create Task
- **GIVEN** An authenticated user and task details.
- **WHEN** They POST to `/api/tasks`.
- **THEN** A new task is created and linked to the user.

### Requirement: Update Task Status
- **GIVEN** An authenticated user and an existing task ID.
- **WHEN** They PATCH to `/api/tasks/{id}/status`.
- **THEN** The status and optional `timeSpentSeconds` are updated.

### Requirement: Motivation Quotes
- **GIVEN** The system is initialized with seed data.
- **WHEN** Anyone (no auth) requests GET `/api/quotes/random`.
- **THEN** A random quote is returned from the database.
