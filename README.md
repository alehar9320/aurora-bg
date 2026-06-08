# Aurora BG

[![npm](https://img.shields.io/npm/v/aurora-bg)](https://www.npmjs.com/package/aurora-bg)
[![CI](https://github.com/alehar9320/aurora-bg/actions/workflows/ci.yml/badge.svg)](https://github.com/alehar9320/aurora-bg/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/min/aurora-bg)](https://bundlephobia.com/package/aurora-bg)
[![License](https://img.shields.io/npm/l/aurora-bg)](https://github.com/alehar9320/aurora-bg/blob/main/LICENSE)
[![Docs](https://img.shields.io/badge/docs-github--pages-blue)](https://alehar9320.github.io/aurora-bg/)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://alehar9320.github.io/aurora-bg/)

> **Native Web aurora borealis background animation.**  
> Framework-agnostic, zero dependencies. Use it with React, Vue, Angular, Svelte, or vanilla HTML.

## Features

- **Zero dependencies** — nothing to install besides this package
- **Canvas-based** — 60fps animation, hardware accelerated
- **Web Component** — use as a `<aurora-bg>` tag, works anywhere
- **Programmatic API** — `new AuroraEngine(canvas, options)` for full control
- **Responsive** — auto-resizes with `ResizeObserver`
- **Accessible** — respects `prefers-reduced-motion`

## Quick Start

### Option A: CDN (no build tool needed)

```html
<script src="https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js"></script>
<script>auroraBg.defineAuroraBg()</script>
<aurora-bg colors="#00ff88,#00aaff" density="0.7"></aurora-bg>
```

### Option B: npm

```bash
npm install aurora-bg
```

```ts
import { defineAuroraBg } from 'aurora-bg'
defineAuroraBg()
```

```html
<aurora-bg colors="#00ff88,#00aaff" density="0.7"></aurora-bg>
```

### Option C: Imperative (any framework)

```ts
import { AuroraEngine } from 'aurora-bg'

const canvas = document.getElementById('my-canvas') as HTMLCanvasElement
const engine = new AuroraEngine(canvas, {
  colors: ['#00ff88', '#00aaff'],
  density: 0.7,
  speed: 1.0,
})
engine.start()
```

## API Reference

### Options (`AuroraOptions`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colors` | `string[]` | `['#00ff88', '#00aaff', '#ff44ff']` | Hex color palette |
| `density` | `number` | `0.5` | Particle density (0–1) |
| `speed` | `number` | `1.0` | Animation speed multiplier |
| `opacity` | `number` | `0.8` | Overall opacity (0–1) |
| `intensity` | `number` | `1.0` | Aurora brightness (0–2) |
| `scrollFactor` | `number` | `0.5` | Scroll parallax influence |
| `mountains` | `boolean` | `false` | Render animated silhouettes |

### `AuroraEngine` Methods

| Method | Description |
|--------|-------------|
| `start()` | Begin the animation loop |
| `stop()` | Pause the animation loop |
| `destroy()` | Clean up all resources (canvas, listeners, RAF) |
| `setOptions(opts)` | Update options at runtime |
| `setScroll(y)` | Update scroll position for parallax |
| `resize(w?, h?)` | Resize canvas (auto-detects parent if called without args) |

### `<aurora-bg>` Attributes

Same as options, but as HTML attributes. Boolean attributes (like `mountains`) are true when present.

```html
<aurora-bg
  colors="#00ff88,#00aaff"
  density="0.7"
  speed="0.8"
  opacity="0.9"
  intensity="1.2"
  scroll-factor="0.3"
  mountains
></aurora-bg>
```

## Accessibility

The animation **automatically pauses** when the user's system has `prefers-reduced-motion: reduce` enabled.

## Browser Support

Chrome, Firefox, Safari, Edge — all modern browsers that support Canvas API and Custom Elements v1.

## AI-Friendly

This library is designed for easy discovery and use by AI coding tools.

**Copy-paste prompt for your AI assistant:**

> "Add an aurora borealis background animation to my website using the `aurora-bg` npm package"

**CDN version:**

> "Add a `<aurora-bg>` element from the `aurora-bg` CDN with green and blue colors"

The API is intentionally minimal — one class, one web component, one options interface.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT © Alexander Härenstam
