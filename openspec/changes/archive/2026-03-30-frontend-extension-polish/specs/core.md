## Polish Requirements

### Requirement: Skeleton Loading UI
- **GIVEN** The app is in a `loading` state for tasks or auth.
- **WHEN** React renders the initial dashboard.
- **THEN** Shimmering glassmorphic placeholders are shown instead of a plain "Loading..." text.

### Requirement: Completion Celebration
- **GIVEN** A focus session timer in `ImmersiveView` reaches `00:00`.
- **WHEN** The backend sync is triggered.
- **THEN** A "Mission Accomplished!" overlay with a success checkmark is displayed for 3 seconds.

### Requirement: Task List Refinement
- **GIVEN** A list of tasks on the dashboard.
- **WHEN** Moving the cursor over a task row.
- **THEN** The row's border-color should transition to `var(--accent)` and the backdrop-blur should increase.

### Requirement: Empty State Illustration
- **GIVEN** A user with zero tasks.
- **WHEN** The dashboard is displayed.
- **THEN** Instead of raw text, show a centered layout with an icon and "Your journey starts here."
