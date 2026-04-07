# Proposal: frontend-extension-task-management-refinement

## Goal
To enhance the task management experience by adding full CRUD (Create, Read, Update, Delete) capabilities to the extension UI. This includes inline editing of task titles and a secure, in-place deletion confirmation to prevent accidental data loss.

## Scope
- **Inline Editing**:
  - Add an "Edit" icon (✏️) to each task row.
  - Toggling edit mode transforms the title into an input field for immediate updates.
  - Supports `Enter` to save and `Escape` to cancel.
- **Secure Deletion**:
  - Add a "Delete" icon (🗑️) to each task row.
  - Implement an **In-Place Confirmation**: Clicking 🗑️ toggles the button into a "Confirm?" state with "Yes/No" options.
- **Architectural Cleanup**:
  - Refactor the task list logic into a dedicated `TaskItem.tsx` component to encapsulate local editing and deletion states.

## Motivation
A "Productivity Tool" must give the user full control over their focus goals. Currently, tasks are permanent once created, which limits flexibility for users who made typos or changed their priorities. Adding a premium confirmation flow keeps the UI clean without the need for intrusive browser alerts.
