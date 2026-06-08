# Contributing

## Development Setup

1. Fork the repo
2. Clone your fork
3. `npm install`
4. `npm run dev` (watch mode)
5. Open `examples/canvas.html` in a browser (see canvas in isolation)
6. `npm run demo` (full website demo at http://localhost:4000)

## Project Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Build TypeScript + Rollup bundles (ESM + UMD) |
| `npm run dev` | Watch mode for development |
| `npm run dev:example` | Watch + serve examples at http://localhost:3000 |
| `npm run demo` | Serve full website demo at http://localhost:4000 |
| `npm test` | Run vitest test suite |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier on src/ |
| `npm run docs:build` | Regenerate TypeDoc API documentation |
| `npm run docs:preview` | Preview docs/ at http://localhost:3000 |

## Project Structure

```
src/
  engine.ts          — Core animation logic
  aurora-element.ts  — Web Component wrapper
  index.ts           — Public API
  types.ts           — AuroraOptions interface
tests/               — Vitest test files
docs/
  index.html         — Landing page (hand-crafted)
  preview.svg        — Aurora preview illustration
  api/               — TypeDoc-generated API docs
  .nojekyll          — GitHub Pages marker (do not delete)
```

## Documentation Workflow

1. Edit JSDoc annotations in `src/` for API documentation
2. Edit `docs/index.html` for landing page changes
3. Edit `README.md` for project-level documentation
4. Edit `AI.md` for AI-friendly reference and copy-paste prompts
5. Run `npm run docs:build` to regenerate TypeDoc output in `docs/api/`
6. Preview with `npm run docs:preview`
7. Commit all changes together

### Documentation files and when to update them

| File | Update when |
|------|-------------|
| `src/*.ts` (JSDoc) | Public API changes |
| `README.md` | Feature changes, API changes, version bumps |
| `AI.md` | New API, new prompts, new framework integrations |
| `docs/index.html` | Landing page content changes |
| `docs/api/` | Regenerate after JSDoc changes |
| `.github/copilot-instructions.md` | API surface changes |
| `AGENTS.md` | New agents, conventions, or commands |

## Before Submitting a PR

1. `npm run lint` — must be clean
2. `npm test` — must pass
3. `npm run build` — must succeed
4. Update `CHANGELOG.md`
5. Update `README.md` if the API changed
6. Run `npm run docs:build` if JSDoc or API docs changed

## Commit Convention

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `chore:` maintenance
- `refactor:` code change without feature/fix

## AI-Friendly Contribution Guide

This project is designed for AI-assisted development. Here's how to work effectively with AI tools:

### When asking an AI to contribute

Include in your prompt:
1. **Framework context**: Web Component, React, Vue, etc.
2. **What changed**: API, docs, tests, etc.
3. **What to verify**: `npm run lint`, `npm test`, `npm run build`

### Where to put AI-related docs

- **Copy-paste prompts** for end users → `AI.md`
- **Copilot inline instructions** → `.github/copilot-instructions.md`
- **Opencode agent instructions** → `AGENTS.md`

### AI prompt style guide

- Use complete, ready-to-copy-paste prompt blocks
- Include the CDN URL and npm package name in every prompt
- Reference the exact export names (`AuroraEngine`, `defineAuroraBg`)
- Mention framework-specific patterns (SSR, lifecycle, cleanup)
