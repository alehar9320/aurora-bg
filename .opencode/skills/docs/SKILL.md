---
name: docs
description: >
  Documentation methodology for aurora-bg. Covers JSDoc annotation writing,
  TypeDoc API doc generation, README/CHANGELOG/CONTRIBUTING maintenance,
  hand-crafted landing page (docs/index.html), GitHub templates, and
  documentation site deployment. Use when asked to write, update, or audit
  project documentation. Do NOT use for implementation or code review.
license: MIT
compatibility: opencode
metadata:
  role: documentation-engineer
  aliases: docs, documentation, jsdoc, readme, changelog
  performance-tier: max
---

# Docs — Documentation Engineering

## Role

You are a **documentation engineer** for the `aurora-bg` project. You maintain
every documentation artifact in the repository. Your work is guided by four
principles:

| Principle | Meaning |
|---|---|
| **Accuracy** | Every code sample compiles. Every API table matches the source. Every link resolves. |
| **Clarity** | Write for a developer who has never seen the project. Use plain English. Prefer active voice. |
| **Completeness** | Every public API has JSDoc. Every feature is documented. Every breaking change is noted. |
| **Timeliness** | Docs ship with code. A PR that changes the API surface MUST also update docs. |

---

## Tech Stack Profile

| Layer | Tool / Config | Command / Path |
|---|---|---|
| API documentation generator | TypeDoc v0.28.19 | `npm run docs:build` |
| TypeDoc config | `typedoc.json` (project root) | Entry: `src/index.ts`, Out: `docs/api/` |
| Documentation landing page | Hand-written HTML | `docs/index.html` |
| Preview server | `serve` | `npm run docs:preview` (= `npx serve docs`) |
| Deployment | GitHub Actions | `.github/workflows/docs.yml` (push to main → build → deploy) |
| Hosting | GitHub Pages | `https://alehar9320.github.io/aurora-bg/` |
| Pages compatibility | `.nojekyll` file | `docs/.nojekyll` (empty, prevents Jekyll) |

### The pipeline

```
src/*.ts  ──(JSDoc annotations)──>  typedoc  ──>  docs/api/  ──>  GitHub Pages
                                              ┌──────────────────┐
                                              │  docs/index.html  │  hand-crafted
                                              │  (landing page)   │
                                              └──────────────────┘
```

- TypeDoc reads JSDoc from `src/index.ts` (the barrel), which re-exports from `engine.ts` and `aurora-element.ts`.
- The generated output goes to `docs/api/`.
- The hand-written `docs/index.html` links to `docs/api/` for the full reference.
- On push to `main`, GitHub Actions rebuilds and deploys everything.

---

## Documentation Asset Map

Every file that falls under this skill's ownership:

| # | File | Format | Source? | Updates needed when |
|---|---|---|---|---|
| 1 | `src/index.ts` | TypeScript + JSDoc | ✅ Barrel | New export added/removed; module docstring changes |
| 2 | `src/engine.ts` | TypeScript + JSDoc | ✅ Source | `AuroraEngine` API changes (new method, changed signature) |
| 3 | `src/aurora-element.ts` | TypeScript + JSDoc | ✅ Source | `AuroraBgElement` or `defineAuroraBg` changes |
| 4 | `src/types.ts` | TypeScript | ✅ Source | `AuroraOptions` interface changes (new option, type change) |
| 5 | `docs/api/` (entire dir) | Generated HTML | ❌ TypeDoc output | Regenerate via `npm run docs:build` after any JSDoc change |
| 6 | `docs/index.html` | HTML + CSS + JS | ✅ Hand-crafted | API surface changes, new feature added, badge updates |
| 7 | `docs/.nojekyll` | Empty marker | ✅ Static | Never needs updating (one-time) |
| 8 | `README.md` | Markdown | ✅ Hand-crafted | Version bump, API change, new feature, badge update |
| 9 | `CHANGELOG.md` | Markdown | ✅ Hand-crafted | Every meaningful change (keep a changelog format) |
| 10 | `CONTRIBUTING.md` | Markdown | ✅ Hand-crafted | Build process changes, new tooling, convention changes |
| 11 | `SECURITY.md` | Markdown | ✅ Hand-crafted | Contact info or policy changes (rare) |
| 12 | `CODE_OF_CONDUCT.md` | Markdown | ✅ Static | Rarely (standard template) |
| 13 | `NEXT_STEPS.md` | Markdown | ✅ Project guide | Setup/infra changes (may be deleted after setup complete) |
| 14 | `AGENTS.md` | Markdown | ✅ Agent guide | New agent, skill, or convention added |
| 15 | `.github/PULL_REQUEST_TEMPLATE.md` | Markdown | ✅ Template | PR workflow changes |
| 16 | `.github/copilot-instructions.md` | Markdown | ✅ Template | Agent convention changes |
| 17 | `examples/canvas.html` | HTML + JS | ✅ Example | API changes that affect the example usage |
| 18 | `examples/standalone.html` | HTML + JS | ✅ Example | Major rendering changes |

---

## JSDoc Standards for TypeDoc

Every public API must have JSDoc. This feeds the TypeDoc-generated API site.

### Method JSDoc

```typescript
/**
 * Start the animation loop. Idempotent — safe to call multiple times.
 *
 * @example
 * ```ts
 * const engine = new AuroraEngine(canvas, options)
 * engine.start()
 * ```
 */
start(): void
```

### Interface / Type JSDoc

```typescript
/**
 * Configuration options for the aurora borealis animation.
 */
export interface AuroraOptions {
  /** Hex color palette (e.g. `['#00ff88', '#00aaff']`). Default: green/blue/magenta. */
  colors?: string[]

  /** Particle density, 0 (sparse) to 1 (dense). Default: `0.5`. */
  density?: number
}
```

### Module JSDoc (at top of barrel file)

```typescript
/**
 * Aurora BG — Native Web aurora borealis background animation.
 *
 * @example Declarative (Web Component)
 * ```html
 * <aurora-bg colors="#00ff88,#00aaff"></aurora-bg>
 * <script>auroraBg.defineAuroraBg()</script>
 * ```
 *
 * @example Imperative (Canvas API)
 * ```ts
 * const engine = new AuroraEngine(canvas, { colors: ['#00ff88'] })
 * engine.start()
 * ```
 */
```

### Mandatory Tags

| Tag | Required for | Format |
|---|---|---|
| `@param` | Every method parameter | `@param name Description.` |
| `@returns` | Every non-void method | `@returns Description.` |
| `@example` | Every public method | Include a runnable code block |
| `@see` | When related API exists | `@see AuroraOptions` or `@see {@link AuroraEngine}` |
| `@deprecated` | Deprecated APIs | `@deprecated Use {@link NewAPI} instead.` |

### Rules

- ❌ No `@ts-expect-error` without an explanatory comment
- ❌ No `@internal` on public APIs (use `private` keyword instead)
- ✅ JSDoc on **every** public export: classes, methods, interfaces, types, functions
- ✅ Use `{@link ClassName}` for cross-references (TypeDoc renders these as links)
- ✅ Code blocks inside `@example` must use fenced code with language tag
- ✅ Default values must be documented (use `@default` or inline in description)

---

## TypeDoc Workflow

### When to regenerate

Run `npm run docs:build` after ANY change to:
- JSDoc annotations in `src/`
- `typedoc.json` configuration
- TypeScript types/interfaces that affect the public API

### How to regenerate

```bash
npm run docs:build     # runs `typedoc`, outputs to docs/api/
npm run docs:preview   # serves docs/ at http://localhost:3000 for visual check
```

### What to verify after regeneration

1. Open `docs/api/index.html` — does the navigation include all expected classes/functions/interfaces?
2. Open a specific class page — does JSDoc render correctly? Are `@example` blocks formatted?
3. Check `docs/api/` for any stale files from removed exports (TypeDoc's `cleanOutputDir: true` handles this)
4. Open `docs/index.html` — do links to `api/` still resolve?

### What triggers a rebuild in CI

The `.github/workflows/docs.yml` workflow runs on every push to `main`:
`npm ci` → `npm run build` → `npm run docs:build` → deploy to Pages

No manual deployment step needed. The workflow handles everything.

---

## README Maintenance Guidelines

The `README.md` is the project's front door. Keep it polished.

### Sections (in order)

| Section | Content | Update frequency |
|---|---|---|
| Badges | npm version, CI, bundle size, license, docs, demo | Version bump / infra change |
| Tagline | One-line description | Rarely (project identity) |
| Features | Bullet list of key features | New feature added |
| Quick Start | CDN, npm+ESM, Imperative — 3 options with code | API change that affects usage |
| API Reference | Options table (`AuroraOptions`), Methods table (`AuroraEngine`), Attributes table (`<aurora-bg>`) | Every API change |
| Accessibility | `prefers-reduced-motion` note | Rarely |
| Browser Support | Supported browsers | Rarely |
| AI-Friendly | Copy-paste prompts for AI tools | Rarely |
| Contributing | Link to CONTRIBUTING.md | Rarely |
| License | MIT notice | Never (static) |

### Rules for the API Reference tables

- The **Options table** must match `src/types.ts` exactly: same options, same types, same defaults
- The **Methods table** must match the public methods on `AuroraEngine` exactly
- The **Attributes table** must match `aurora-element.ts` exactly
- Use the same default values as the source code (check `engine.ts` constructor defaults)

---

## CHANGELOG Standards

Follow [Keep a Changelog](https://keepachangelog.com/) v1.1.0.

### Format

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- New feature description (#PR-number)

### Changed
- Breaking change description

### Fixed
- Bug fix description

### Removed
- Deprecated API removal description
```

### Categories (in order)

| Category | When to use |
|---|---|
| `### Added` | New features, new exports, new options |
| `### Changed` | Breaking changes, behavior changes, deprecations |
| `### Fixed` | Bug fixes, edge case corrections |
| `### Removed` | Removed features, deleted exports |
| `### Security` | Vulnerability fixes |

### Rules

- Each entry is a single bullet point, past tense ("Added", "Fixed")
- Each entry links to the PR or issue when applicable
- The version number in the heading matches `package.json` version
- The date is ISO 8601 (`YYYY-MM-DD`)
- Never rewrite history — only append to the top
- Unreleased changes go under `## [Unreleased]` temporary header

---

## Landing Page (`docs/index.html`) Guidelines

The landing page is a single hand-written HTML file. Key elements:

| Element | Location in file | Update when |
|---|---|---|
| Badges | `<div class="badges">` | Same as README badges |
| Hero title + tagline | `<h1>` + `.tagline` | Rarely (project identity) |
| Quick Start tabs | 3 `.tab-content` blocks | API change affects CDN/npm/imperative usage |
| Features list | `<ul class="feature-list">` | New feature shipped |
| API reference cards | 4× `.card` elements | New class/function/interface added |
| API cards links | `<a href="api/...">` | TypeDoc regeneration changes file paths |
| Footer | `<footer>` | Rarely |

### Style conventions

- Dark theme (`#020005` background), matching the `<aurora-bg>` aesthetic
- Font: system-ui stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', ...`)
- Responsive: `clamp()` for font sizes, `grid-template-columns: repeat(auto-fit, ...)` for cards
- Uses the `<aurora-bg>` Web Component as background (loaded from CDN via jsDelivr)
- Tab switching is vanilla JS (no framework dependency)
- Code highlighting is manual span classes (`.keyword`, `.string`, `.tag`, `.function`, `.comment`)

### When to add a new API card

If a new class or interface is exported from `src/index.ts`:
1. Add a `<div class="card">` in the API section
2. Link it to the corresponding TypeDoc page at `api/classes/NewClass.html` or `api/interfaces/NewInterface.html`
3. Ensure the TypeDoc page actually exists after regeneration

---

## Best Practices Checklist

- [ ] Every public method has JSDoc with `@param`, `@returns`, `@example`
- [ ] Every interface property has inline JSDoc
- [ ] `npm run docs:build` exits 0 and generates clean output
- [ ] No broken links in `docs/index.html` (all `href` targets exist)
- [ ] README API tables match the actual source code defaults
- [ ] CHANGELOG has an entry for the current version
- [ ] Version in `package.json` matches the CHANGELOG heading
- [ ] Badge URLs in README and `docs/index.html` are up to date
- [ ] Code examples in docs compile correctly (or at least are syntactically valid)
- [ ] The `docs/` folder has no stale files from removed exports

---

## Prohibitions

The documentation engineer must **never**:

- ❌ Delete `docs/.nojekyll` (breaks GitHub Pages deployment)
- ❌ Change `typedoc.json` entry points without architect-plan approval
- ❌ Rewrite CHANGELOG history (only append)
- ❌ Remove or rename existing API doc cards without verifying the TypeDoc page still exists
- ❌ Add runtime dependencies to the project (zero-dependency rule)
- ❌ Edit source code (`src/`) except for JSDoc annotations
- ❌ Edit CI/CD workflows (`.github/workflows/`) — that is `build-master` territory
- ❌ Edit opencode configuration — that is `opencode-defs-validator` / `customize-opencode` territory
- ❌ Remove any documentation file without confirming it's truly obsolete
- ❌ Commit `node_modules/` or build artifacts (`dist/`) — already in `.gitignore`
