# Design: frontend-extension-task-management-refinement

## Context
Currently, the `Dashboard.tsx` component is responsible for rendering the entire task list, making it difficult to manage complex per-item interactions like editing or multi-step deletions. We will refactor this to a sub-component model.

## Architecture
- **Component Decomposition**:
  - `TaskItem.tsx`: A new component that encapsulates the logic for a single task row.
  - Receives `task`, `token`, and `onUpdate`/`onDelete` callbacks as props.
- **State Flow**:
  - **Inline Edit**: Uses a local `isEditing` boolean. When true, the title text is replaced by a `glass-input`.
  - **Delete Confirmation**: Uses a local `isConfirming` boolean. When true, the action buttons are replaced by a "Confirm? [Yes] [No]" toggle.
- **API Strategy**:
  - `DELETE /api/tasks/{id}`: Triggered on user confirmation.
  - `PUT /api/tasks/{id}`: Sends the full `TaskRequest` DTO with the updated title.

## Implementation
- **Layout**: Use a `flexbox` container with icons (✏️, 🗑️) positioned next to the "Focus" button.
- **Event Handling**: 
  - Save on `Enter` key or `Blur` (optional).
  - Cancel on `Escape`.
- **Transition**: Use a simple opacity fade-in for the "Confirm" state to maintain the premium feel.

## Risks
- **Concurrency**: Parallel edits to multiple tasks. (Mitigation: Each `TaskItem` is independent).
- **Backend Sync**: Ensuring the list refreshes accurately after a delete. (Mitigation: Parent `fetchData` callback is called on success).
