# Changelog

## [Unreleased]

### Added
- `AI.md` — dedicated AI reference with 42 copy-paste prompts organized by framework and use case
- `docs/preview.svg` — static aurora borealis preview illustration for README and docs
- README: YAML frontmatter for AI tool ingestion (`name`, `version`, `keywords`, `exports`)
- README: "Preview" section with SVG screenshot + live demo link
- README: "🤖 Copy-Paste Prompts" section (8 framework-specific prompts: vanilla, React, Vue, Svelte, Angular, Next.js, custom canvas, config tuning)
- README: "Quick Reference" compact code block with all APIs (`AuroraEngine`, `defineAuroraBg`, `<aurora-bg>`)
- README: "Framework Integration" section (React, Vue 3, Svelte, Angular) with copy-paste code
- README: "JSON Schema" block for programmatic consumption
- README: "📖 AI Reference" section linking to `AI.md`
- `.github/copilot-instructions.md`: expanded from 17 to 80 lines with full API tables, framework integration patterns (React, Vue, Svelte, Angular, Next.js), and copy-paste prompts
- `AGENTS.md`: quick reference YAML block + "AI Agent Prompts" section (8 prompts)
- `CONTRIBUTING.md`: project commands table, documentation workflow, AI-friendly contribution guide
- `docs/index.html`: JSON-LD structured data (SoftwareApplication schema)
- `docs/index.html`: SVG preview fallback image (shown when Web Component fails to render)
- `docs/index.html`: "AI Prompts" section with 4 cards linking to the full prompt library
- `docs/index.html`: AI Reference link in footer

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
