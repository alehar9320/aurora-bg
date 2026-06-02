import { describe, it, expect, beforeAll, vi } from 'vitest'

function createMockCanvas(
  w = 800,
  h = 600,
): HTMLCanvasElement {
  const ctx = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    createLinearGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    getContext: vi.fn(() => ctx),
  }
  Object.defineProperties(ctx, {
    fillStyle: { value: '', writable: true },
    globalAlpha: { value: 1, writable: true },
    globalCompositeOperation: { value: '', writable: true },
    strokeStyle: { value: '', writable: true },
    lineWidth: { value: 1, writable: true },
  })
  const canvas = {
    width: w,
    height: h,
    getContext: vi.fn(() => ctx),
    parentElement: { getBoundingClientRect: () => ({ width: w, height: h }) },
  }
  // Wire the context back reference
  ;(ctx as any).canvas = canvas
  return canvas as unknown as HTMLCanvasElement
}

describe('AuroraEngine', () => {
  beforeAll(() => {
    if (typeof document === 'undefined') {
      vi.stubGlobal('document', {
        documentElement: { scrollHeight: 2000 },
      })
      vi.stubGlobal('window', { innerHeight: 800 })
    }
    if (typeof requestAnimationFrame === 'undefined') {
      let rafId = 0
      vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => {
        setTimeout(() => cb(performance.now()), 0)
        return ++rafId
      }))
      vi.stubGlobal('cancelAnimationFrame', vi.fn())
    }
    if (typeof performance === 'undefined') {
      vi.stubGlobal('performance', { now: () => 0 })
    }
  })

  it('creates engine with default options', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas)
    expect(engine).toBeInstanceOf(AuroraEngine)
    engine.destroy()
  })

  it('accepts custom options including intensity and scrollFactor', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas, {
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      density: 0.8,
      speed: 1.5,
      opacity: 0.9,
      intensity: 1.2,
      scrollFactor: 0.5,
    })
    expect(engine).toBeInstanceOf(AuroraEngine)
    engine.destroy()
  })

  it('handles mountains option and generation', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas, { mountains: true })
    // @ts-ignore - accessing private for test
    expect(engine.mountainsBack.length).toBeGreaterThan(0)
    // @ts-ignore - accessing private for test
    expect(engine.mountainsFront.length).toBeGreaterThan(0)
    engine.destroy()
  })

  it('start and stop lifecycle', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas)
    engine.start()
    engine.stop()
    engine.destroy()
  })

  it('setScroll stores the value without crashing', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas)
    expect(() => engine.setScroll(300)).not.toThrow()
    engine.destroy()
  })

  it('resize updates canvas dimensions', async () => {
    const { AuroraEngine } = await import('../src/engine.js')
    const canvas = createMockCanvas()
    const engine = new AuroraEngine(canvas)
    engine.resize(1024, 768)
    expect(canvas.width).toBe(1024)
    expect(canvas.height).toBe(768)
    engine.destroy()
  })
})
