# Aurora BG — Copilot Instructions

npm package: `aurora-bg`

This is a TypeScript library for rendering aurora borealis animations on HTML Canvas.

## Key points
- `AuroraEngine` is the main class — takes a `<canvas>` element and `AuroraOptions`
- `<aurora-bg>` is a Web Component for declarative use
- No external dependencies
- Canvas-based rendering (not DOM/CSS animation)
- Respects `prefers-reduced-motion` media query

## Common tasks
- To use: `new AuroraEngine(canvas, { colors: [...], density: 0.5 }).start()`
- To resize: call `engine.resize()` or rely on the ResizeObserver in the Web Component
- To clean up: call `engine.destroy()` in framework lifecycle hooks
