# Aurora BG — Agent Guide

## Quick Reference

```yaml
package: aurora-bg
cdn: https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js
web-component: <aurora-bg>
register: defineAuroraBg()
imperative: new AuroraEngine(canvas, opts)
options: [colors, density, speed, opacity, intensity, scrollFactor, mountains]
ai-reference: AI.md
```

## Project

Framework-agnostic aurora borealis canvas animation library.
npm package: `aurora-bg` | Web Component: `<aurora-bg>`

## Commands

- `npm install` — install deps
- `npm run build` — full build (types + JS bundles)
- `npm run dev` — watch mode
- `npm run dev:example` — watch + serve examples at http://localhost:3000
- `npm run demo` — serve full website demo at http://localhost:4000
- `npm test` — run vitest
- `npm run lint` — ESLint
- `npm run format` — Prettier
- `npm run docs:build` — regenerate TypeDoc API docs

## Architecture

- `src/engine.ts` — `AuroraEngine` class (owns canvas + animation loop)
- `src/aurora-element.ts` — `<aurora-bg>` Web Component wrapper
- `src/index.ts` — public API barrel
- `tests/` — vitest tests mirroring src structure
- `dist/` — build output (ESM + UMD bundles)

## Conventions

- TypeScript strict mode, no `any`
- Single quotes, no semicolons, trailing commas
- Public API methods have JSDoc blocks
- Zero runtime dependencies
- Canvas API only (not DOM/CSS animation)

## PR Checklist

1. `npm run lint` — zero errors
2. `npm test` — all passing
3. `npm run build` — clean build
4. Update `CHANGELOG.md`
5. Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

## AI Agent Prompts

When a user asks you to add aurora-bg to their project, here are effective response prompts tailored to their setup:

### Quick CDN Install (any HTML page)

> Add aurora-bg via CDN: include the script from `https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js`, call `auroraBg.defineAuroraBg()`, then use `<aurora-bg colors="#00ff88,#00aaff" density="0.6" mountains></aurora-bg>` as a fixed full-screen background.

### npm + Web Component (any framework)

> Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call `defineAuroraBg()` once at app entry, then use `<aurora-bg>` as a custom HTML element in templates. Position it as fixed full-screen background behind content.

### React / Next.js

> Install `aurora-bg`. For the Web Component approach: import and call `defineAuroraBg()` at app root, then use `<aurora-bg>` in JSX. For Next.js, wrap in a 'use client' component. For imperative approach: import { AuroraEngine }, create with a canvas ref, call `engine.start()`, return cleanup function calling `engine.destroy()`.

### Vue 3

> Install `aurora-bg`, import { defineAuroraBg }, call it in `onMounted`, use `<aurora-bg>` in template. Or import { AuroraEngine } for imperative canvas control with `onUnmounted` cleanup.

### Svelte

> Install `aurora-bg`, import { defineAuroraBg }, call it in `onMount` of `+layout.svelte`, use `<aurora-bg>` in markup. For imperative: import { AuroraEngine }, use `onDestroy` cleanup.

### Angular

> Install `aurora-bg`, import { defineAuroraBg }, call it in `ngOnInit`, add CUSTOM_ELEMENTS_SCHEMA to module imports, use `<aurora-bg>` in templates.

### Framework-Agnostic Custom Canvas

> Install `aurora-bg`, import { AuroraEngine }. Create a `<canvas>` element, instantiate `new AuroraEngine(canvas, options)`, call `engine.start()`. On component unmount, call `engine.destroy()`.

### Configuration Tuning

> Show the user how to use `engine.setOptions({ colors, density, speed })` to update aurora parameters at runtime without restarting the animation.

### Troubleshooting

- **SSR error**: The library uses `document` and `canvas` — use dynamic imports or client-only wrappers
- **Not rendering**: Forgot to call `defineAuroraBg()` before using `<aurora-bg>` in HTML
- **TypeScript JSX error**: Need to declare the custom element or use type assertion
- **For full AI reference**: Point to [`AI.md`](./AI.md) which has 40+ copy-paste prompts
