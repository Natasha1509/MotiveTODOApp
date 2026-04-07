# Technical Design: Frontend Extension Theme Refinement

## Architecture: Dynamic Theme System

### CSS Variables (Theming Engine)
- **File**: `index.css`
- **Mechanism**: Use `:root` for Dark Mode (default) and a toggleable `.light-theme` class applied to the root element.
- **Variables**:
  - `--bg-deep`: Dark/Light radial gradient base.
  - `--bg-card`: Semi-transparent glass background.
  - `--text-primary`: High-contrast text.
  - `--text-secondary`: Lower-contrast metadata text.
  - `--border-glass`: Subtle borders for glass panels.

### React State & Persistence
- **File**: `App.tsx`
- **State**: `const [theme, setTheme] = useState<'light' | 'dark'>('dark');`
- **Persistence**: Synchronize the `theme` variable with `chrome.storage.local`.
- **Effect**: On mount, load the stored theme and apply the corresponding class to the primary container.

## UI/UX: Premium Iconography

### SVG Design Language
- **Dimensions**: 20x20px viewBox for consistency.
- **Style**: Minimalist, 2px stroke width, rounded caps and joins.
- **Colors**: Use `currentColor` to inherit theme colors.

### Icon Implementation
- **Refresh**: Simple circular arrow.
- **Fullscreen**: Four outward-facing corners.
- **Theme Toggle**: 
  - **Dark Mode**: Crescent moon icon.
  - **Light Mode**: Sun with rays icon.

## Logic: Smooth Transitions
- **CSS Transitions**: Apply `transition: background-color 0.3s, color 0.3s, border-color 0.3s` to all themed elements to ensure a premium, fluid transition when toggling modes.
