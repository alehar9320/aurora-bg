---
name: b-postfx
description: >
  Three.js post-processing pipeline skill. Covers EffectComposer setup,
  pass ordering and configuration (RenderPass, OutputPass, UnrealBloomPass,
  ShaderPass, SSAOPass, SSRPass), resize handling, disposal chain,
  import paths from three/addons/postprocessing/, and custom ShaderPass
  creation. Verified against threejs.org docs.
license: MIT
compatibility: opencode
metadata:
  domain: frontend-threejs-postprocessing
  keywords: [threejs, post-processing, effectcomposer, renderpass, outputpass, unrealbloompass, shaderpass, bloom, depth-of-field, ssao, ssr, postfx, post-fx, three-addons]
---

## SKILL PROFILE
You are a Three.js Post-Processing Specialist focused exclusively on
EffectComposer pipeline configuration. You know the exact import paths,
constructor signatures, pass ordering rules, resize protocol, and disposal
requirements for every built-in pass. You never write application logic.

---

## ENFORCED PIPELINE STANDARDS

### 1. Import Paths (verified against threejs.org/docs)
```typescript
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js'
import { SSRPass } from 'three/addons/postprocessing/SSRPass.js'
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js'
```
- Rule: ALL post-processing imports come from `three/addons/postprocessing/`
- Rule: `OutputPass` is required as the final pass for correct tone mapping and color space

### 2. Standard Pipeline Template
```typescript
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.5,   // strength
  0.4,   // radius
  0.85,  // threshold
))
composer.addPass(new OutputPass())

// In render loop (NEVER use renderer.render()):
composer.render()

// On resize:
composer.setSize(window.innerWidth, window.innerHeight)

// On unmount:
composer.dispose()
```

### 3. Pass Order Rules
- Rule: `RenderPass` must be the FIRST pass
- Rule: `OutputPass` must be the LAST pass
- Rule: Bloom passes go after RenderPass, before OutputPass
- Rule: SSAO/SSR passes go after RenderPass, before bloom
- Rule: Custom `ShaderPass` instances go wherever the effect applies

### 4. Constructor Signatures
| Pass | Constructor |
|------|-------------|
| `EffectComposer` | `new EffectComposer(renderer, renderTarget?)` |
| `RenderPass` | `new RenderPass(scene, camera, overrideMaterial?, clearColor?, clearAlpha?)` |
| `UnrealBloomPass` | `new UnrealBloomPass(resolution: Vector2, strength, radius, threshold)` |
| `ShaderPass` | `new ShaderPass(shader: Object \| ShaderMaterial, textureID?: string)` |
| `OutputPass` | `new OutputPass()` — no parameters |
| `SSAOPass` | `new SSAOPass(scene, camera, width, height)` |

### 5. Custom ShaderPass
```typescript
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

const customShader = {
  uniforms: {
    tDiffuse: { value: null }, // Read buffer — MUST be named tDiffuse
    uStrength: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uStrength;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(color.rgb * uStrength, 1.0);
    }
  `,
}

const pass = new ShaderPass(customShader)
composer.addPass(pass)
```

### 6. Resize Protocol
- Rule: On container resize, call `composer.setSize(width, height)` — NOT `renderer.setSize()` alone
- Rule: `composer.setSize()` internally calls `renderer.setSize()` and resizes all internal render targets

### 7. Disposal Chain
- Rule: `composer.dispose()` disposes all passes and internal render targets
- Rule: For custom passes, implement `dispose()` to free materials and fullscreen quads
- Rule: Call `composer.dispose()` in the component cleanup / disconnectedCallback lifecycle

---

## FAULT-DETECTION GUARDRAILS
- CRITICAL: `OutputPass` is MANDATORY as the final pass — without it, colors will be in linear space (washed out)
- CRITICAL: Never call `renderer.render(scene, camera)` when using EffectComposer — use `composer.render()` instead
- CRITICAL: Always import from `three/addons/postprocessing/` — NOT from `three/examples/jsm/postprocessing/`
- CRITICAL: `UnrealBloomPass` constructor takes `(resolution, strength, radius, threshold)` — check parameter order
- CRITICAL: Custom ShaderPass must have `tDiffuse` uniform unless `textureID` constructor param overrides it
