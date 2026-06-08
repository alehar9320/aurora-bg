# Aurora BG — Copilot / AI Coding Assistant Instructions

## Package Identity

- **npm**: `aurora-bg`
- **CDN**: `https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js`
- **UMD global**: `auroraBg`
- **Custom element**: `<aurora-bg>`
- **Registration**: `defineAuroraBg()` (idempotent)
- **Main class**: `AuroraEngine`
- **Zero dependencies**: ✅

## API Surface

### Exports

```typescript
export class AuroraEngine {
  constructor(canvas: HTMLCanvasElement, options?: AuroraOptions)
  start(): void          // begin animation loop
  stop(): void           // pause animation loop
  destroy(): void        // full cleanup (canvas, listeners, RAF)
  setOptions(opts: Partial<AuroraOptions>): void  // runtime update
  setScroll(y: number): void  // parallax scroll input
  resize(w?: number, h?: number): void  // auto-detect or explicit
}

export function defineAuroraBg(): void
// Registers <aurora-bg> custom element. Safe to call multiple times.

export class AuroraBgElement extends HTMLElement { }

export interface AuroraOptions {
  colors?: string[]       // default: ['#00ff88', '#00aaff', '#ff44ff']
  density?: number        // default: 0.5, range: 0-1
  speed?: number          // default: 1.0, range: 0-2
  opacity?: number        // default: 0.8, range: 0-1
  intensity?: number      // default: 1.0, range: 0-2
  scrollFactor?: number   // default: 0.5, range: 0-1
  mountains?: boolean     // default: false
}
```

### `<aurora-bg>` Attributes

HTML attributes map to `AuroraOptions` — kebab-case for multi-word:
- `colors` (comma-separated hex: `"#00ff88,#00aaff"`)
- `density`, `speed`, `opacity`, `intensity`, `scroll-factor`
- `mountains` (boolean — present = true)

## Framework Integration Patterns

### React (imperative with cleanup)

```tsx
import { useEffect } from 'react'
import { AuroraEngine } from 'aurora-bg'

function AuroraCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new AuroraEngine(canvas, { colors: ['#00ff88', '#00aaff'] })
    engine.start()
    return () => engine.destroy()
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0 }} />
}
```

### React (Web Component declarative)

```tsx
import { defineAuroraBg } from 'aurora-bg'
defineAuroraBg()  // once at app root

function App() {
  return (
    <>
      <aurora-bg colors="#00ff88,#00aaff" mountains />
      <main style={{ position: 'relative', zIndex: 1 }}>{/* content */}</main>
    </>
  )
}
```

### Vue 3

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { defineAuroraBg } from 'aurora-bg'
onMounted(() => defineAuroraBg())
</script>
<template>
  <aurora-bg colors="#00ff88,#00aaff" density="0.6" mountains />
  <div style="position:relative;z-index:1"><slot /></div>
</template>
```

### Svelte

```svelte
<script>
  import { onMount } from 'svelte'
  import { defineAuroraBg } from 'aurora-bg'
  onMount(() => defineAuroraBg())
</script>
<aurora-bg colors="#00ff88,#00aaff" mountains />
<div style="position:relative;z-index:1"><slot /></div>
```

### Angular

```typescript
import { Component, OnInit } from '@angular/core'
import { defineAuroraBg } from 'aurora-bg'

@Component({
  template: `
    <aurora-bg colors="#00ff88,#00aaff" mountains></aurora-bg>
    <div style="position:relative;z-index:1"><router-outlet></router-outlet></div>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() { defineAuroraBg() }
}
```

## Copy-Paste Prompts (for your AI assistant)

### Add aurora via CDN to vanilla HTML

> "Add an aurora borealis animated background using CDN: include https://cdn.jsdelivr.net/npm/aurora-bg/dist/aurora.umd.js, call auroraBg.defineAuroraBg(), and use `<aurora-bg colors="#00ff88,#00aaff" mountains>` as a fixed full-screen background."

### Add aurora to React app

> "Install `aurora-bg`, import { defineAuroraBg } from 'aurora-bg', call it once, and use `<aurora-bg>` as a fixed full-screen background element. Colors: green and blue."

### Add aurora to Next.js (App Router)

> "Create a 'use client' component that imports { defineAuroraBg } from 'aurora-bg', calls it in useEffect, and renders `<aurora-bg>` as fixed full-screen background."

### Add aurora with custom canvas

> "Install `aurora-bg`, import { AuroraEngine }, create with a canvas element, call engine.start(), and destroy on unmount."

## Key Behaviors

- **SSR**: aurora-bg is browser-only. Must use client-side rendering patterns (dynamic import, `use client`, `ClientOnly`)
- **Cleanup**: Always call `engine.destroy()` when removing the component
- **Auto-resize**: Web Component handles this via ResizeObserver
- **Reduced motion**: Automatically pauses with `prefers-reduced-motion: reduce`
- **TypeScript**: The package includes `.d.ts` files; no separate `@types` needed
