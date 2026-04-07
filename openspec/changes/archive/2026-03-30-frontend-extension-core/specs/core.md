## ADDED Requirements

### Requirement: Dark Mode Theme
- **GIVEN** The extension is opened by any user.
- **WHEN** The component mounts.
- **THEN** The UI displays a high-contrast dark theme with accent colors (#c084fc).

### Requirement: Login / Registration
- **GIVEN** A user on the landing (Auth) screen.
- **WHEN** They enter valid credentials and click "Login" or "Register".
- **THEN** The app posts to the backend and stores the JWT in `chrome.storage.local`.

### Requirement: Task List View
- **GIVEN** A logged-in user.
- **WHEN** The app is opened.
- **THEN** The app fetches tasks from `localhost:8080/api/tasks` and displays them as a list.

### Requirement: Random Quote Display
- **GIVEN** The app is opened.
- **WHEN** The component mounts.
- **THEN** A random quote is fetched from `/api/quotes/random` and displayed at the top.
