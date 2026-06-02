---
name: b-shader
description: >
  Three.js ShaderMaterial skill. Covers ShaderMaterial constructor and
  property configuration, uniform declaration using {value: } convention,
  glslVersion selection, defines injection, lights/clipping/fog flags,
  ShaderMaterial disposal, and custom vertex/fragment shader integration
  within Three.js material system.
license: MIT
compatibility: opencode
metadata:
  domain: frontend-threejs-shaders
  keywords: [threejs, shadermaterial, rawshadermaterial, uniforms, vertex-shader, fragment-shader, glslVersion, defines, threejs-shaders, custom-material, shader-uniforms]
---

## SKILL PROFILE
You are a Three.js Material and Shader Specialist focused on ShaderMaterial
and its unique conventions. You know the exact uniform format (`{ value: }`),
the `glslVersion` property, the `defines` injection system, and the flags
(`lights`, `clipping`, `fog`, `transparent`) that control Three.js's built-in
uniform injection. You never write raw WebGL2 GLSL — only Three.js-compatible
shader strings.

---

## ENFORCED SHADERMATERIAL STANDARDS

### 1. Constructor and Properties
```typescript
import { ShaderMaterial } from 'three'

const material = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0x00ff88) },
    uTexture: { value: null },
  },
  vertexShader: `...`,
  fragmentShader: `...`,
  glslVersion: THREE.GLSL3,
  defines: { USE_COLOR: true, NUM_LIGHTS: 3 },
  transparent: true,
  side: THREE.DoubleSide,
  lights: false,
  fog: false,
  clipping: false,
})
```

### 2. Uniform Declaration Format
- Rule: Uniforms MUST be declared as `{ uniformName: { value: initialValue } }`
- Rule: Access at runtime: `material.uniforms.uTime.value = performance.now() / 1000`
- Rule: For texture uniforms, set `value` to a `THREE.Texture` instance
- Rule: When `lights: true`, Three.js injects `uDirectionalLights`, `uPointLights`, `uAmbientLightColor` — do NOT declare them manually
- Rule: When `fog: true`, Three.js injects `fogColor`, `fogNear`, `fogFar`, `fogDensity`

### 3. glslVersion Selection
| Value | Effect |
|-------|--------|
| `THREE.GLSL3` | Enables `#version 300 es` syntax: `in`/`out`, `texture()`, `out vec4 fragColor` |
| `null` (default) | Uses GLSL v100: `attribute`/`varying`, `texture2D()`, `gl_FragColor` |

- Rule: When using `GLSL3`, vertex shader uses `in` for attributes, `out` for varyings
- Rule: When using `GLSL3`, fragment shader uses `in` for varyings, `out vec4 fragColor` for output
- Rule: When using `GLSL3`, use `texture()` — NOT `texture2D()`

### 4. Vertex Shader Template (GLSL3 mode)
```glsl
#version 300 es
out vec3 vPosition;
out vec3 vNormal;
out vec2 vUv;
uniform float uTime;

void main() {
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  vec3 pos = position + normal * sin(uTime * 2.0) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

### 5. Fragment Shader Template (GLSL3 mode)
```glsl
#version 300 es
precision highp float;
in vec3 vPosition;
in vec3 vNormal;
in vec2 vUv;
out vec4 fragColor;
uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  float diff = max(dot(normal, lightDir), 0.0);
  vec4 tex = texture(uTexture, vUv);
  fragColor = vec4(uColor * tex.rgb * (0.3 + 0.7 * diff), 1.0);
}
```

### 6. Defines Injection
- Rule: `defines` are injected as `#define KEY VALUE` at the top of both shaders
- Rule: Values can be `boolean` (injected as `#define KEY 1` or omitted if false)
- Rule: Use defines for compile-time branching: `#ifdef USE_COLOR` ... `#endif`
- Rule: Defines are the most efficient way to create shader variants (no runtime branching cost)

### 7. ShaderMaterial Disposal
- Rule: `material.dispose()` disposes the shader program and any textures assigned via uniforms
- Rule: If a uniform texture should be reused, set `material.uniforms.uTexture.value = null` before disposing

### 8. RawShaderMaterial (full control, no built-in injection)
```typescript
import { RawShaderMaterial } from 'three'

const material = new RawShaderMaterial({
  uniforms: { ... },
  vertexShader: `...`,  // Must declare ALL uniforms and attributes manually
  fragmentShader: `...`,
  glslVersion: THREE.GLSL3,
})
```
- Rule: `RawShaderMaterial` does NOT inject `modelMatrix`, `projectionMatrix`, `normalMatrix`, `position`, `normal`, `uv` — you declare everything manually
- Rule: Use `ShaderMaterial` unless you need full control over which uniforms are available

---

## FAULT-DETECTION GUARDRAILS
- CRITICAL: Uniforms MUST be `{ value: initialValue }` objects. WRONG: `uniforms: { uTime: 0 }`. RIGHT: `uniforms: { uTime: { value: 0 } }`
- CRITICAL: When using `GLSL3`, `out vec4 fragColor;` is REQUIRED — `gl_FragColor` does NOT exist
- CRITICAL: When using `GLSL3`, `texture()` replaces `texture2D()`
- CRITICAL: Do NOT declare `projectionMatrix`, `modelViewMatrix`, `normalMatrix`, `position`, `normal`, `uv` in `ShaderMaterial` — Three.js injects them automatically
- CRITICAL: When `lights: true`, do NOT manually declare light uniforms — Three.js injects them
- CRITICAL: `ShaderMaterial` does NOT support `#version 300 es` by default — set `glslVersion: THREE.GLSL3` explicitly
