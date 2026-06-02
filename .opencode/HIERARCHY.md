# OpenCode Agent & Skill Hierarchy

> **Primary agents** (UI-visible): `architect-plan` (plan-only) and `build-surgical-precision-engineer` (implementation-only).  
> **All other agents** are `subagent` mode — hidden from the tab-cycle UI, loadable programmatically via `subagent()`.

```
.opencode/
├── HIERARCHY.md                            ← this file
│
├── agents/
│   ├── architect-plan.md                  ← planning (edit:deny) — existing
│   ├── orchestrator/
│   │   └── webgl3d-engineer.md            ← selects branch, routes sub-tasks
│   ├── branch-a-webgl2/
│   │   └── glsl-shader-dev.md             ← GLSL v300 es shader specialist
│   ├── branch-b-threejs/
│   │   ├── postfx-composer.md             ← EffectComposer pipeline
│   │   └── shader-engineer.md             ← ShaderMaterial / custom shaders
│   └── support/
│       ├── build-master.md                ← build/test/lint/release
│       └── opencode-defs-validator.md     ← config validation vs docs/source
│
└── skills/
    ├── architect-plan/                    ← planning decomposition rules
    ├── a-canvas-3d-expert/                ← Branch A: pure WebGL2 standards
    ├── a-glsl-shader/                     ← GLSL v300 es syntax + debug
    ├── b-threejs-expert/                  ← Branch B: Three.js + docs protocol
    ├── b-postfx/                          ← EffectComposer + passes
    ├── b-shader/                          ← ShaderMaterial conventions
    └── opencode-definitions/              ← opencode config validation rules

Convention:
  agents/ → nested by role
  skills/ → prefixed by branch (a- = WebGL2, b- = Three.js)
  Sub-agent files load their matching skill via skill({ name: '...' })
```
