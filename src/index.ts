/**
 * Aurora BG — Native Web aurora borealis background animation.
 *
 * @example Declarative (Web Component)
 * ```html
 * <script type="module">
 *   import { defineAuroraBg } from 'aurora-bg'
 *   defineAuroraBg()
 * </script>
 * <aurora-bg colors="#00ff88,#00aaff" density="0.6"></aurora-bg>
 * ```
 *
 * @example Imperative (Canvas API)
 * ```ts
 * import { AuroraEngine } from 'aurora-bg'
 * const engine = new AuroraEngine(document.getElementById('c'), {
 *   colors: ['#00ff88', '#00aaff'],
 * })
 * engine.start()
 * ```
 */
export { AuroraEngine } from './engine.js'
export { defineAuroraBg, AuroraBgElement } from './aurora-element.js'
export type { AuroraOptions } from './types.js'
