## ADDED Requirements

### Requirement: Inline Task Editing
- **GIVEN** A logged-in user viewing their task list.
- **WHEN** They click the "Edit" icon on a task.
- **THEN** The task title is replaced by a text input field pre-filled with the current title.
- **WHEN** The user presses "Enter" or clicks "Save".
- **THEN** A `PUT /api/tasks/{id}` request is sent with the new title.
- **WHEN** Successful, the UI updates and returns to read-only mode.

### Requirement: In-Place Delete Confirmation
- **GIVEN** A task in the list.
- **WHEN** The "Delete" icon is clicked.
- **THEN** The specific task row displays a confirmation message: "Delete this task?".
- **THEN** Two buttons appear: "[YES]" (confirm) and "[NO]" (cancel).
- **WHEN** "[YES]" is clicked, the `DELETE /api/tasks/{id}` request is sent.
- **WHEN** "[NO]" is clicked, the row returns to its normal state without deleting.

### Requirement: Code Organization
- **GIVEN** The current monolithic `Dashboard.tsx`.
- **WHEN** Implementing these features.
- **THEN** Each task should be encapsulated in a `TaskItem.tsx` component to manage its own "Editing" and "Confirming" states cleanly.
