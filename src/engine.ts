import type { AuroraOptions } from './types.js'

type Weight = 'left' | 'center' | 'right'

interface Star {
  x: number
  y: number
  radius: number
  alpha: number
  blinkSpeed: number
  blinkPhase: number
  parallax: number
}

interface Ion {
  x: number
  y: number
  size: number
  speed: number
  amplitude: number
  frequency: number
  phase: number
  alpha: number
}

interface Curtain {
  hueIndex: number
  saturation: string
  baseAlpha: number
  amp: number
  baseY: number
  spd: number
  freq: number
  exp: number
  weight: Weight
  scrollAlphaLeft?: number
  useScrollAlpha?: 'right'
}

const DEFAULT_HUES = [200, 190, 275, 315]

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16)
  const g1 = parseInt(color1.slice(3, 5), 16)
  const b1 = parseInt(color1.slice(5, 7), 16)
  const r2 = parseInt(color2.slice(1, 3), 16)
  const g2 = parseInt(color2.slice(3, 5), 16)
  const b2 = parseInt(color2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * factor)
  const g = Math.round(g1 + (g2 - g1) * factor)
  const b = Math.round(b1 + (b2 - b1) * factor)
  return `rgb(${r},${g},${b})`
}

export class AuroraEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: Required<AuroraOptions>
  private animationId: number | null = null
  private stars: Star[] = []
  private ions: Ion[] = []
  private scrollY = 0
  private maxScroll = 1
  private startTime = 0
  private curtainHues: number[] = []
  private mountainsBack: { x: number; y: number }[] = []
  private mountainsFront: { x: number; y: number }[] = []

  constructor(canvas: HTMLCanvasElement, options?: AuroraOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.options = {
      colors: ['#00ff88', '#00aaff', '#ff44ff'],
      density: 0.5,
      speed: 1.0,
      opacity: 0.8,
      intensity: 1.0,
      scrollFactor: 0.5,
      mountains: false,
      ...options,
    }
    if (typeof document !== 'undefined') {
      this.maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
    }
    this.initCurtainHues()
    this.resize()
  }

  /** Start the animation loop */
  start(): void {
    if (this.animationId !== null) return
    this.startTime = performance.now()
    this.loop(this.startTime)
  }

  /** Stop the animation loop */
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  /** Clean up resources */
  destroy(): void {
    this.stop()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /** Update options at runtime */
  setOptions(options: Partial<AuroraOptions>): void {
    Object.assign(this.options, options)
    this.initCurtainHues()
    if (
      options.colors ||
      options.density !== undefined ||
      options.mountains !== undefined
    ) {
      this.generateStars()
      this.generateIons()
      this.generateMountains()
    }
  }

  /** Resize the canvas and regenerate particles */
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
    this.generateStars()
    this.generateIons()
    this.generateMountains()
  }

  /** Update scroll position for parallax effects */
  setScroll(y: number): void {
    this.scrollY = y
    if (typeof document !== 'undefined') {
      this.maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
    }
  }

  private initCurtainHues(): void {
    const hues = this.options.colors.map(c => hexToHsl(c).h)
    while (hues.length < 4) {
      hues.push(DEFAULT_HUES[hues.length])
    }
    this.curtainHues = hues.slice(0, 4)
  }

  private generateStars(): void {
    const { width, height } = this.canvas
    if (width === 0 || height === 0) return
    const count = Math.round(200 * this.options.density)
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.9,
      radius: Math.random() * 0.9,
      alpha: Math.random() * 0.6,
      blinkSpeed: 0.0002 + Math.random() * 0.0005,
      blinkPhase: Math.random() * Math.PI * 2,
      parallax: 0.05 + Math.random() * 0.2,
    }))
  }

  private generateIons(): void {
    const { width, height } = this.canvas
    if (width === 0 || height === 0) return
    const count = Math.round(80 * this.options.density)
    this.ions = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: 0.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.5,
      amplitude: 15 + Math.random() * 30,
      frequency: 0.002 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.1 + Math.random() * 0.4,
    }))
  }

  private generateMountains(): void {
    if (!this.options.mountains) return
    const { width, height } = this.canvas
    if (width === 0 || height === 0) return
    this.mountainsBack = []
    this.mountainsFront = []
    let hBack = height - 120
    let hFront = height - 40
    for (let x = 0; x <= width + 20; x += 15) {
      hBack += (Math.random() - 0.5) * 12
      if (hBack > height - 60) hBack = height - 60
      if (hBack < height - 240) hBack = height - 240
      this.mountainsBack.push({ x, y: hBack })

      hFront += (Math.random() - 0.5) * 8
      if (hFront > height) hFront = height
      if (hFront < height - 100) hFront = height - 100
      this.mountainsFront.push({ x, y: hFront })
    }
  }

  private drawBackground(scrollFraction: number): void {
    const { width, height } = this.canvas
    if (width === 0 || height === 0) return
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(
      0,
      interpolateColor('#010003', '#000001', scrollFraction),
    )
    gradient.addColorStop(
      0.5,
      interpolateColor('#02010c', '#010003', scrollFraction),
    )
    gradient.addColorStop(1, '#020005')
    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, width, height)
  }

  private drawStars(time: number, scrollFraction: number): void {
    const { height } = this.canvas
    if (height === 0) return
    for (const star of this.stars) {
      const scrollOffset =
        this.scrollY * star.parallax * this.options.scrollFactor
      let yPos = (star.y + scrollOffset) % height
      if (yPos < 0) yPos += height

      const pulse = Math.sin(time * star.blinkSpeed + star.blinkPhase) ** 2
      const alpha = star.alpha * 0.1 + pulse * 0.3
      const starAlpha = Math.max(0, Math.min(1, alpha * this.options.opacity))
      if (starAlpha <= 0.01) continue

      this.ctx.beginPath()
      this.ctx.arc(star.x, yPos, star.radius, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(255,255,255,${starAlpha})`
      this.ctx.fill()
    }
  }

  private drawIons(time: number): void {
    const { width, height } = this.canvas
    this.ctx.fillStyle = 'white'
    for (const ion of this.ions) {
      const xPos =
        (ion.x + time * 0.03 * ion.speed * this.options.speed) % (width + 100) -
        50
      const yPos =
        ion.y +
        Math.sin(xPos * ion.frequency + time * 0.001 + ion.phase) *
          ion.amplitude
      if (yPos < -20 || yPos > height + 20) continue

      const edgeFade = Math.sin((xPos / width) * Math.PI)
      const alpha = Math.max(
        0,
        ion.alpha * edgeFade * 0.7 * this.options.opacity,
      )
      if (alpha <= 0.01) continue

      this.ctx.globalAlpha = alpha
      this.ctx.beginPath()
      this.ctx.arc(xPos, yPos, ion.size, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.globalAlpha = 1
  }

  private drawAurora(
    time: number,
    elapsed: number,
    scrollFraction: number,
  ): void {
    const { width, height } = this.canvas
    this.ctx.globalCompositeOperation = 'screen'

    const zenithY = -height * 1.5
    const hueShift = (time * 0.003) % 360
    const solarSurge =
      0.7 +
      Math.sin(time * 0.0008) * 0.25 +
      Math.cos(time * 0.0003) * 0.15

    const FADE_START = 6000
    const FADE_DURATION = 8000
    const initialMult = 1.6
    const finalMult = 0.75

    let globalFade = initialMult
    if (elapsed > FADE_START) {
      const progress = Math.min(
        1,
        (elapsed - FADE_START) / FADE_DURATION,
      )
      globalFade = initialMult - progress * (initialMult - finalMult)
    }
    globalFade *= this.options.intensity

    const curtains: Curtain[] = [
      {
        hueIndex: 0,
        saturation: '20%',
        baseAlpha: 0.35,
        amp: 380,
        baseY: height * 0.30,
        spd: 0.00018,
        freq: 0.0008,
        exp: 2.0,
        weight: 'left',
        scrollAlphaLeft: 0.5,
      },
      {
        hueIndex: 1,
        saturation: '80%',
        baseAlpha: 0.30,
        amp: 320,
        baseY: height * 0.35,
        spd: 0.00030,
        freq: 0.0012,
        exp: 2.2,
        weight: 'center',
        scrollAlphaLeft: 0.3,
      },
      {
        hueIndex: 2,
        saturation: '90%',
        baseAlpha: 0.38,
        amp: 400,
        baseY: height * 0.40,
        spd: 0.00025,
        freq: 0.0010,
        exp: 2.4,
        weight: 'right',
      },
      {
        hueIndex: 3,
        saturation: '95%',
        baseAlpha: 0.18,
        amp: 280,
        baseY: height * 0.48,
        spd: 0.00045,
        freq: 0.0018,
        exp: 4.0,
        weight: 'right',
        useScrollAlpha: 'right',
      },
    ]

    for (const curtain of curtains) {
      let scrollAdjustedAlpha = curtain.baseAlpha
      if (curtain.scrollAlphaLeft !== undefined) {
        scrollAdjustedAlpha =
          curtain.baseAlpha *
          (1 - scrollFraction * curtain.scrollAlphaLeft)
      }
      if (curtain.useScrollAlpha === 'right') {
        scrollAdjustedAlpha *= scrollFraction
      }

      const currentAlphaLimit = Math.min(
        1.0,
        scrollAdjustedAlpha *
          Math.max(0.2, Math.min(1.2, solarSurge)) *
          globalFade *
          this.options.opacity,
      )

      if (currentAlphaLimit <= 0) continue

      const currentHue =
        (this.curtainHues[curtain.hueIndex] + hueShift) % 360
      const colorTop = `hsla(${currentHue},${curtain.saturation},60%,0)`
      const colorMid = `hsla(${currentHue},${curtain.saturation},55%,${currentAlphaLimit})`
      const colorBot = `hsla(${(currentHue + 30) % 360},${curtain.saturation},50%,0)`

      const step = curtain.exp > 3.5 ? 1.0 : 2.0

      for (let x = -180; x <= width + 180; x += step) {
        const wave =
          Math.sin(
            x * curtain.freq + elapsed * curtain.spd * this.options.speed,
          ) * 0.6
        const ripple =
          Math.sin(
            x * curtain.freq * 3.2 -
              elapsed * curtain.spd * 2.1 * this.options.speed,
          ) * 0.25
        const micro =
          Math.sin(
            x * curtain.freq * 6.5 +
              elapsed * curtain.spd * 4.0 * this.options.speed,
          ) * 0.15
        const fold = wave + ripple + micro

        let spatialBias: number
        if (curtain.weight === 'left') {
          spatialBias = Math.max(0, 1 - x / width)
        } else if (curtain.weight === 'right') {
          spatialBias = Math.max(0, x / width)
        } else {
          spatialBias = 1
        }

        const baseY = curtain.baseY + fold * 140
        const dx = x - width / 2
        const dy = baseY - zenithY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const ux = dx / dist
        const uy = dy / dist

        const energyAlpha =
          Math.pow((fold + 1) / 2, curtain.exp) * 2 * spatialBias
        if (energyAlpha < 0.005) continue

        const rayLength = curtain.amp * (0.8 + energyAlpha * 0.4)
        const startX = x - ux * rayLength / 2
        const startY = baseY - uy * rayLength / 2
        const endX = x + ux * rayLength / 2
        const endY = baseY + uy * rayLength / 2

        let verticalFade = 1
        if (endY > height * 0.5) {
          verticalFade = Math.max(
            0,
            1 - (endY - height * 0.5) / (height * 0.3),
          )
        }

        const finalAlpha = Math.min(1, energyAlpha * verticalFade)
        if (finalAlpha < 0.005) continue

        this.ctx.globalAlpha = finalAlpha
        const gradient = this.ctx.createLinearGradient(
          startX,
          startY,
          endX,
          endY,
        )
        gradient.addColorStop(0, colorTop)
        gradient.addColorStop(0.4, colorMid)
        gradient.addColorStop(1, colorBot)
        this.ctx.strokeStyle = gradient
        this.ctx.lineWidth = step === 1.0 ? 1.5 : 2.0
        this.ctx.beginPath()
        this.ctx.moveTo(startX, startY)
        this.ctx.lineTo(endX, endY)
        this.ctx.stroke()
      }
    }

    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.globalAlpha = 1
  }

  private drawMountains(scrollFraction: number): void {
    if (!this.options.mountains) return
    const { width, height } = this.canvas
    const offset = scrollFraction * height * this.options.scrollFactor

    // Back Mountains
    const backGrad = this.ctx.createLinearGradient(
      0,
      height - 300 + offset,
      0,
      height + offset,
    )
    backGrad.addColorStop(0, '#030209')
    backGrad.addColorStop(1, '#010003')

    this.ctx.fillStyle = backGrad
    this.ctx.beginPath()
    this.ctx.moveTo(0, height + offset)
    this.mountainsBack.forEach(p => this.ctx.lineTo(p.x, p.y + offset))
    this.ctx.lineTo(width, height + offset)
    this.ctx.fill()

    // Front Mountains
    this.ctx.fillStyle = '#010002'
    this.ctx.beginPath()
    this.ctx.moveTo(0, height + offset)
    this.mountainsFront.forEach(p => this.ctx.lineTo(p.x, p.y + offset))
    this.ctx.lineTo(width, height + offset)
    this.ctx.fill()
  }

  private loop = (timestamp: number): void => {
    this.animationId = requestAnimationFrame(this.loop)
    const { width, height } = this.canvas
    if (width === 0 || height === 0) return
    this.ctx.clearRect(0, 0, width, height)
    const scrollFraction = Math.min(
      1,
      Math.max(0, this.scrollY / this.maxScroll),
    )
    const elapsed = timestamp - this.startTime
    this.drawBackground(scrollFraction)
    this.drawStars(timestamp, scrollFraction)
    this.drawAurora(timestamp, elapsed, scrollFraction)
    this.drawIons(timestamp)
    this.drawMountains(scrollFraction)
  }
}
