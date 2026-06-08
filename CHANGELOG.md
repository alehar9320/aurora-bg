# Changelog

## [0.3.0] — 2026-06-08
### Added
- TypeDoc-generated API documentation at `docs/api/`
- Documentation landing page with integrated aurora demo at `docs/index.html`
- GitHub Actions workflow (`docs.yml`) for automated docs deployment to GitHub Pages
- `.nojekyll` file for GitHub Pages compatibility
- `typedoc.json` configuration file
- `docs:build` and `docs:preview` npm scripts
- Documentation badge in README

## [0.2.0] — 2026-06-01

### Added
- Full aurora borealis rendering engine with 4-layer magnetic curtain simulation
- Twinkling star field with parallax support
- Drifting ion micro-particles
- Accessibility fade-in: peak intensity for 6s, then calm background presence
- `intensity` option for overall brightness control (0–2)
- `scrollFactor` option and `setScroll()` method for scroll-based parallax
- `mountains` option for rendering animated mountain silhouettes
- Premium demo page with glassmorphic UI and FPS counter
- Expanded test coverage for engine lifecycle and options

## [0.1.0] — 2026-05-27

### Added
- Project skeleton with TypeScript, Rollup, Vitest
- `AuroraEngine` class stub (canvas animation loop)
- `<aurora-bg>` Web Component stub
- ESM + UMD dual bundle output
- Full CI/CD with GitHub Actions
- GitHub Pages live demo
- AI-native AGENTS.md and Copilot instructions
