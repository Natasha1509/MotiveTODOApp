# Implementation Tasks: Frontend Extension Theme Refinement

## Phase 8: Theme System & UI Refinement

### Header Refinement (Premium Iconography)
- [x] 8.1 Create minimalist SVG paths for [Refresh] and [Fullscreen] in `Dashboard.tsx`.
- [x] 8.2 Replace placeholder emojis with SVG icons.
- [x] 8.3 Style icons with `currentColor` and 0.7 opacity.

### Theme Engine (Dynamic Light Mode)
- [x] 8.4 Refactor `index.css` to use CSS Variables for all theme-dependent colors.
- [x] 8.5 Define the `.light-theme` class with "Frosted Glass" properties.
- [x] 8.6 Add smooth transitions (`background 0.3s`, etc.) to the theme elements.

### Persistence & Toggle
- [x] 8.7 Implement `theme` state in `App.tsx` (loading from `chrome.storage.local`).
- [x] 8.8 Add the Theme Toggle button (Sun/Moon SVG) to the `Dashboard` header.
- [x] 8.9 Perform final E2E verification of theme switching and icon rendering.

## Phase 8.1: UI Refinement & Readability
- [x] 8.10 Soften the "Zen Frosted" palette in `index.css` (better contrast & blending).
- [x] 8.11 Relocate the Refresh button to the Quote banner.
- [x] 8.12 Streamline the main header by removing redundant actions.

## Phase 8.2: High-Contrast Refinement
- [x] 8.13 Deepen Light-Mode contrast with Near-Black Slate typography (#0f172a).
- [x] 8.14 Increase card opacity to 0.95 in Light Mode.
- [x] 8.15 Synchronize all hardcoded colors in `TaskItem.tsx` and `ImmersiveView.tsx` with theme variables.

## Phase 8.3: Prism Visibility Fixes
- [x] 8.16 Explicitly set quote text and author to use theme variables.
- [x] 8.17 Boost `.btn-icon` base opacity to 0.9.
- [x] 8.18 Verify icon visibility in both Dark and Light modes.

## Phase 8.4: Midnight Moon & Silver Crescent Refinements
- [x] 8.19 Increase Moon icon size (22px) and use solid fill.
- [x] 8.20 Soften Moon icon color to Silver Slate (#94a3b8) for Zen harmony.
