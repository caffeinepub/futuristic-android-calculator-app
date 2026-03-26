# Specification

## Summary
**Goal:** Build a mobile-friendly calculator with a clear touch-first UI, correct basic arithmetic, consistent interaction rules, and accessible/keyboard-friendly controls.

**Planned changes:**
- Create a responsive calculator layout with a display and a button grid for 0–9, decimal, +, −, ×, ÷, =, AC, and backspace.
- Implement calculator state and evaluation behavior (documented in-code), including multi-step input, clear/reset, backspace, repeated equals handling, and graceful divide-by-zero error state.
- Add accessibility and desktop keyboard support (digits, operators, Enter/=, Backspace, Escape) with visible focus states and proper labels.
- Apply a coherent visual theme (colors/typography/spacing) across normal, active, focus, and error states, avoiding blue/purple as primary colors.

**User-visible outcome:** Users can perform basic calculations on mobile or desktop using touch or keyboard, with a readable themed UI, predictable input behavior, and graceful handling of errors like division by zero.
