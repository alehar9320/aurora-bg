# Contributing

## Development Setup
1. Fork the repo
2. Clone your fork
3. `npm install`
4. `npm run dev` (watch mode)
5. Open `examples/basic.html` in a browser

## Project Structure
```
src/
  engine.ts          — Core animation logic
  aurora-element.ts  — Web Component wrapper
  index.ts           — Public API
tests/               — Vitest test files
```

## Before Submitting a PR
1. `npm run lint` — must be clean
2. `npm test` — must pass
3. `npm run build` — must succeed
4. Update `CHANGELOG.md`
5. Update `README.md` if the API changed

## Commit Convention
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `chore:` maintenance
- `refactor:` code change without feature/fix
