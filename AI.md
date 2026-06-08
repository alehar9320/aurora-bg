---
name: aurora-bg
description: Native Web aurora borealis background animation — framework-agnostic, zero dependencies
version: 0.3.0
type: library
keywords: [aurora, borealis, northern-lights, background, animation, canvas, web-component, custom-element]
license: MIT
repository: https://github.com/alehar9320/aurora-bg
homepage: https://alehar9320.github.io/aurora-bg/
cdn: https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js
npm: aurora-bg
exports:
  classes: [AuroraEngine, AuroraBgElement]
  functions: [defineAuroraBg]
  interfaces: [AuroraOptions]
---

# Aurora BG — AI Reference

> This file is the definitive reference for AI coding assistants.
> Contains 40+ copy-paste prompts, full API signatures, and integration patterns.

---

## Quick Facts

| Property | Value |
|----------|-------|
| Package | `aurora-bg` |
| CDN | `https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js` |
| UMD global | `auroraBg` |
| Custom Element | `<aurora-bg>` |
| Registration | `defineAuroraBg()` |
| Main class | `AuroraEngine` |
| Zero deps | ✅ |
| Canvas only | ✅ |
| License | MIT |

---

## Exact Exports

```typescript
export class AuroraEngine {
  constructor(canvas: HTMLCanvasElement, options?: AuroraOptions)
  start(): void
  stop(): void
  destroy(): void
  setOptions(opts: Partial<AuroraOptions>): void
  setScroll(y: number): void
  resize(width?: number, height?: number): void
}

export function defineAuroraBg(): void
// Registers <aurora-bg> custom element. Idempotent — safe to call multiple times.

export class AuroraBgElement extends HTMLElement { }
// The Web Component class backing <aurora-bg>. Auto-resizes, handles lifecycle.

export interface AuroraOptions {
  colors?: string[]
  density?: number
  speed?: number
  opacity?: number
  intensity?: number
  scrollFactor?: number
  mountains?: boolean
}
```

---

## AuroraOptions — Complete Reference

| Option | Type | Default | Range | Description |
|--------|------|---------|-------|-------------|
| `colors` | `string[]` | `['#00ff88', '#00aaff', '#ff44ff']` | Any hex colors | Color palette for aurora layers |
| `density` | `number` | `0.5` | 0–1 | Particle/wave density |
| `speed` | `number` | `1.0` | 0–2 | Animation speed multiplier |
| `opacity` | `number` | `0.8` | 0–1 | Overall opacity |
| `intensity` | `number` | `1.0` | 0–2 | Aurora brightness |
| `scrollFactor` | `number` | `0.5` | 0–1 | Scroll parallax influence |
| `mountains` | `boolean` | `false` | — | Render animated mountain silhouettes |

---

## Copy-Paste Prompt Library

### Category 1: Quick Install

| # | Scenario | Prompt |
|---|----------|--------|
| 1 | **Vanilla HTML (CDN)** | "Add an aurora borealis animated background to my HTML page using the aurora-bg CDN. Include the script from https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js, call auroraBg.defineAuroraBg(), and add a \<aurora-bg\> element with colors=\"#00ff88,#00aaff\" density=\"0.6\" mountains. Make it full-screen fixed background." |
| 2 | **npm + any framework** | "Install the npm package `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call defineAuroraBg() once at app startup, then use \<aurora-bg\> as a custom element in templates." |
| 3 | **Custom canvas** | "Install `aurora-bg`, import { AuroraEngine } from 'aurora-bg', create a new instance with a \<canvas\> element and options, call engine.start()." |

### Category 2: Framework-Specific

| # | Framework | Prompt |
|---|-----------|--------|
| 4 | **React (Vite/CRA)** | "Add an aurora borealis background to my React app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it once at app root, and render \<aurora-bg\> as a fixed full-screen background behind my app content. Use colors=\"#00ff88,#00aaff\" and the mountains attribute." |
| 5 | **Next.js (App Router)** | "Add an aurora borealis background to my Next.js app. Create a 'use client' component that imports { defineAuroraBg } from 'aurora-bg', calls it in useEffect, and renders \<aurora-bg\> as a fixed full-screen background. Import this component in the root layout." |
| 6 | **Next.js (Pages Router)** | "Add an aurora borealis background to my Next.js pages app. Create a component that uses dynamic import with ssr: false to load 'aurora-bg', then renders \<aurora-bg\> as a fixed background. Place it in _app.tsx." |
| 7 | **Vue 3 (Composition API)** | "Add an aurora borealis animated background to my Vue 3 app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it in App.vue's onMounted hook, and add a \<aurora-bg\> element as a fixed full-screen background with colors=\"#00ff88,#00aaff\" density=\"0.7\"." |
| 8 | **Vue 3 (Options API)** | "Add an aurora borealis background to my Vue 3 app using Options API. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it in mounted(), and place \<aurora-bg\> in the template as a fixed background element." |
| 9 | **Svelte** | "Add an aurora borealis background to my Svelte app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg' in +layout.svelte's onMount, call it, and add \<aurora-bg\> as a fixed full-screen background behind content." |
| 10 | **SvelteKit** | "Add an aurora borealis background to my SvelteKit app. In +layout.svelte, import { defineAuroraBg } from 'aurora-bg' and { onMount } from 'svelte'. Call defineAuroraBg() in onMount. Add \<aurora-bg\> as a fixed full-screen background. Wrap page content in a div with position: relative." |
| 11 | **Angular (standalone)** | "Add an aurora borealis animated background to my Angular app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it in AppComponent's ngOnInit, and add \<aurora-bg\> as a full-screen fixed background element in the template." |
| 12 | **Angular (NgModule)** | "Add an aurora borealis background to my Angular app using NgModules. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it in AppComponent.ngOnInit. Add CUSTOM_ELEMENTS_SCHEMA to the module, then use \<aurora-bg\> in templates." |
| 13 | **SolidJS** | "Add an aurora borealis background to my SolidJS app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it once at app entry, and add \<aurora-bg\> as a fixed full-screen background." |
| 14 | **Astro** | "Add an aurora borealis background to my Astro site. In a .astro component, add a \<script\> tag with 'import { defineAuroraBg } from \"aurora-bg\"; defineAuroraBg();' and use \<aurora-bg\> directly in the template as a fixed background." |
| 15 | **Remix** | "Add an aurora borealis background to my Remix app. In app/root.tsx, use useEffect with ClientOnly pattern. Import { defineAuroraBg } from 'aurora-bg' in a client component, call it, and render \<aurora-bg\> as fixed background." |
| 16 | **Preact** | "Add an aurora borealis background to my Preact app. Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it in app entry, and use \<aurora-bg\> directly in JSX." |

### Category 3: Configuration

| # | Scenario | Prompt |
|---|----------|--------|
| 17 | **Custom colors** | "I want an aurora borealis with sunset colors — warm oranges, pinks, and purples. Use colors=['#ff4500', '#ff69b4', '#da70d6'] with density 0.6." |
| 18 | **Green aurora** | "I want a classic green aurora only. Set colors=['#00ff88'] and let the rest be defaults." |
| 19 | **High density** | "I want a very dense, vibrant aurora. Set density to 0.9 and intensity to 1.5." |
| 20 | **Subtle background** | "I want a very subtle aurora that doesn't distract. Set opacity to 0.4, density to 0.3, and speed to 0.5." |
| 21 | **Fast motion** | "I want a fast-moving, energetic aurora. Set speed to 1.8 and intensity to 1.3." |
| 22 | **With mountains** | "I want the aurora with mountain silhouettes at the bottom. Set mountains=true and use scrollFactor=0.3 for parallax." |
| 23 | **Runtime update** | "I have an AuroraEngine instance. Show me how to change the colors and speed at runtime using engine.setOptions({ colors: ['#ff0066'], speed: 0.5 })." |
| 24 | **Full-screen Web Component** | "I want \<aurora-bg\> to cover the entire viewport as a fixed background layer, behind all other content. Position it with position:fixed; inset:0; z-index:0; pointer-events:none; display:block;." |

### Category 4: Lifecycle

| # | Scenario | Prompt |
|---|----------|--------|
| 25 | **React — destroy on unmount** | "In a React component using AuroraEngine imperatively, call engine.destroy() in the useEffect cleanup function to avoid memory leaks." |
| 26 | **Vue — destroy on unmount** | "In a Vue component using AuroraEngine, call engine.destroy() in onUnmounted or the beforeUnmount hook." |
| 27 | **Angular — destroy on destroy** | "In Angular, if using AuroraEngine directly, call engine.destroy() in the ngOnDestroy lifecycle hook." |
| 28 | **Svelte — destroy on destroy** | "In Svelte, call engine.destroy() in the onDestroy lifecycle function." |
| 29 | **Pause on visibility change** | "Pause the aurora animation when the browser tab is hidden using document.visibilitychange: call engine.stop() when hidden, engine.start() when visible again." |
| 30 | **Resize handling** | "I want the aurora canvas to resize when the window resizes. For Web Component this is automatic. For imperative use, call engine.resize() on window resize." |
| 31 | **Full lifecycle example** | "Show me a complete example of creating an AuroraEngine, starting it, handling resize, and destroying it on unmount." |

### Category 5: Troubleshooting

| # | Issue | Prompt |
|---|-------|--------|
| 32 | **Web Component not showing** | "My \<aurora-bg\> element is not rendering anything. Did I forget to call defineAuroraBg()? Check that it's called after the script loads and before the element is in the DOM." |
| 33 | **Custom element not registered** | "I'm using \<aurora-bg\> in my HTML but it doesn't render. The error says 'undefined element'. I need to call auroraBg.defineAuroraBg() or import { defineAuroraBg } from 'aurora-bg' and call it." |
| 34 | **TypeScript error** | "TypeScript doesn't recognize the \<aurora-bg\> JSX element. I need to either: (a) use @ts-ignore on the element, (b) add it to the JSX.IntrinsicElements interface, or (c) use React's 'as' casting." |
| 35 | **SSR error** | "I'm getting 'document is not defined' when using aurora-bg with SSR. This is because aurora-bg is a browser-only library. Use dynamic import with ssr: false (Next.js), ClientOnly (Remix), or \<ClientOnly\> (Astro/Solid)." |
| 36 | **Canvas blank** | "The \<canvas\> inside \<aurora-bg\> is blank. Check if the element has width/height. The Web Component auto-resizes via ResizeObserver. For imperative use, ensure the canvas has explicit dimensions." |
| 37 | **Performance issues** | "The aurora animation is laggy. Try lowering density (0.3), disabling mountains, or reducing intensity. The library runs at 60fps but complex scenes may need tuning on lower-end devices." |

### Category 6: Advanced

| # | Scenario | Prompt |
|---|----------|--------|
| 38 | **Multiple auroras** | "Can I have two separate \<aurora-bg\> elements on the same page with different settings? Yes, each element creates its own AuroraEngine instance with independent options." |
| 39 | **Aurora in a specific section** | "I don't want full-screen aurora — I want it inside a specific div section. Use the imperative API: create a canvas inside that div and instantiate AuroraEngine with it." |
| 40 | **Scroll-based reveal** | "I want the aurora to fade in as the user scrolls down. Use AuroraEngine imperatively, update engine.setOptions({ opacity: scrollFraction }) in the scroll handler." |
| 41 | **Stopping the animation** | "How do I permanently stop the aurora? Call engine.stop() to pause the animation loop. The animation can be restarted with engine.start(). Call engine.destroy() for permanent cleanup." |
| 42 | **CDN without npm** | "I don't use npm. Add aurora-bg to my page using a \<script\> tag from jsDelivr CDN at https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js, then use the global auroraBg object." |

---

## Agent Instructions

When you ask an AI assistant to add aurora-bg to your project, include these details in your prompt:

```markdown
1. **Framework**: (React, Vue, Svelte, Angular, Next.js, vanilla HTML, etc.)
2. **SSR?**: (Next.js, Nuxt, SvelteKit, Astro — yes/no)
3. **Placement**: (full-screen background, specific section, inside a canvas)
4. **Colors**: (which hex colors you want — or leave default)
5. **Options**: (density, speed, opacity, mountains, etc.)
6. **Lifecycle**: (will the component mount/unmount dynamically?)
```

### Example good prompt

> "I have a Next.js 14 app with App Router. Add an aurora borealis background as a
> fixed full-screen layer. Use green and blue colors, medium density, and mountain
> silhouettes. The component should be client-side only."

### Example bad prompt

> "Add aurora bg to my app."

---

## Links

| Resource | URL |
|----------|-----|
| Live demo | https://alehar9320.github.io/aurora-bg/ |
| GitHub | https://github.com/alehar9320/aurora-bg |
| npm | https://www.npmjs.com/package/aurora-bg |
| API docs | https://alehar9320.github.io/aurora-bg/api/ |
| AGENTS.md | ./AGENTS.md |
| README | ./README.md |
| Changelog | ./CHANGELOG.md |
| Contributing | ./CONTRIBUTING.md |
