# Aurora BG — Agent Guide

## Project
Framework-agnostic aurora borealis canvas animation library.
npm package: `aurora-bg` | Web Component: `<aurora-bg>`

## Commands
- `npm install` — install deps
- `npm run build` — full build (types + JS bundles)
- `npm run dev` — watch mode
- `npm test` — run vitest
- `npm run lint` — ESLint
- `npm run format` — Prettier

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
