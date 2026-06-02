import { AuroraEngine } from './engine.js'
import type { AuroraOptions } from './types.js'

let registered = false

export function defineAuroraBg(): void {
  if (registered) return
  customElements.define('aurora-bg', AuroraBgElement)
  registered = true
}

export class AuroraBgElement extends HTMLElement {
  private canvas: HTMLCanvasElement
  private engine: AuroraEngine | null = null
  private prefersReducedMotion = false
  private resizeObserver: ResizeObserver | null = null
  private scrollHandler: (() => void) | null = null

  constructor() {
    super()
    this.canvas = document.createElement('canvas')
    this.style.display = 'block'
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }

  connectedCallback(): void {
    this.appendChild(this.canvas)
    this.engine = new AuroraEngine(this.canvas, this.parseOptions())
    if (!this.prefersReducedMotion) this.engine.start()
    this.resizeObserver = new ResizeObserver(() => this.engine?.resize())
    this.resizeObserver.observe(this)

    this.scrollHandler = () => this.engine?.setScroll(window.scrollY)
    window.addEventListener('scroll', this.scrollHandler, { passive: true })
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect()
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler)
      this.scrollHandler = null
    }
    this.engine?.destroy()
  }

  private parseOptions(): AuroraOptions {
    return {
      colors: this.getAttribute('colors')?.split(',') ?? undefined,
      density: this.parseNumber('density'),
      speed: this.parseNumber('speed'),
      opacity: this.parseNumber('opacity'),
      intensity: this.parseNumber('intensity'),
      scrollFactor: this.parseNumber('scroll-factor'),
      mountains: this.hasAttribute('mountains'),
    }
  }

  private parseNumber(attr: string): number | undefined {
    const val = this.getAttribute(attr)
    return val !== null ? Number(val) : undefined
  }
}
