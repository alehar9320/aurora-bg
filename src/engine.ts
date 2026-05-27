import type { AuroraOptions } from './types.js'

export class AuroraEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: Required<AuroraOptions>
  private animationId: number | null = null

  constructor(canvas: HTMLCanvasElement, options?: AuroraOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.options = {
      colors: ['#00ff88', '#00aaff', '#ff44ff'],
      density: 0.5,
      speed: 1.0,
      opacity: 0.8,
      interactive: true,
      ...options,
    }
    this.resize()
  }

  start(): void {
    if (this.animationId !== null) return
    this.loop()
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  destroy(): void {
    this.stop()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  setOptions(options: Partial<AuroraOptions>): void {
    Object.assign(this.options, options)
  }

  resize(width?: number, height?: number): void {
    if (width && height) {
      this.canvas.width = width
      this.canvas.height = height
    } else {
      const rect = this.canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        this.canvas.width = rect.width
        this.canvas.height = rect.height
      }
    }
  }

  private loop = (): void => {
    this.animationId = requestAnimationFrame(this.loop)
    // TODO: render aurora particles
  }
}
