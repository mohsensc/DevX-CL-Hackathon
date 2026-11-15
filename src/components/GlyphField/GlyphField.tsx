import { useEffect, useRef } from 'react'
import styles from './GlyphField.module.css'

export type MaskPainter = (context: CanvasRenderingContext2D, width: number, height: number) => void | Promise<void>

type GlyphFieldProps = {
  paintMask: MaskPainter
  inkColor: string
  highlightColor?: string
  columns?: number
  minCellSize?: number
  className?: string
}

type GlyphCell = {
  column: number
  row: number
  glyphIndex: number
  phase: number
  revealAt: number
  heat: number
}

const glyphCharacters = ['0', '1', '0', '1', '+', '=', '/', '\\', '<', '>', '#', ':', '*', '~', '^', '{', '}', ';', '$', '@']
const inkThreshold = 90
const hoverRadiusRatio = 0.14

function buildGlyphAtlas(cellSize: number, color: string) {
  const atlas = document.createElement('canvas')
  atlas.width = glyphCharacters.length * cellSize
  atlas.height = cellSize
  const atlasContext = atlas.getContext('2d')!
  atlasContext.fillStyle = color
  atlasContext.textAlign = 'center'
  atlasContext.textBaseline = 'middle'
  atlasContext.font = `700 ${Math.round(cellSize * 0.92)}px ui-monospace, SFMono-Regular, Menlo, monospace`
  glyphCharacters.forEach((character, index) => {
    atlasContext.fillText(character, index * cellSize + cellSize / 2, cellSize * 0.56)
  })
  return atlas
}

const randomGlyphIndex = () => Math.floor(Math.random() * glyphCharacters.length)

export function GlyphField({
  paintMask,
  inkColor,
  highlightColor = '#ffffff',
  columns = 90,
  minCellSize = 6,
  className,
}: GlyphFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const context = canvas.getContext('2d')!
    const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, active: false }

    let cells: GlyphCell[] = []
    let cellSize = 8
    let devicePixelRatio = 1
    let inkAtlas: HTMLCanvasElement | null = null
    let highlightAtlas: HTMLCanvasElement | null = null
    let hoverRadius = 0
    let animationFrame = 0
    let isVisible = true
    let isDisposed = false
    let buildVersion = 0
    let startedAt = performance.now()

    async function rebuild() {
      const version = ++buildVersion
      const width = host!.clientWidth
      const height = host!.clientHeight
      if (!width || !height) return

      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const cssCellSize = Math.max(minCellSize, width / columns)
      cellSize = Math.round(cssCellSize * devicePixelRatio)
      const columnCount = Math.ceil(width / cssCellSize)
      const rowCount = Math.ceil(height / cssCellSize)

      const maskCanvas = document.createElement('canvas')
      maskCanvas.width = columnCount
      maskCanvas.height = rowCount
      const maskContext = maskCanvas.getContext('2d', { willReadFrequently: true })!
      await paintMask(maskContext, columnCount, rowCount)
      if (isDisposed || version !== buildVersion) return

      const maskPixels = maskContext.getImageData(0, 0, columnCount, rowCount).data
      const nextCells: GlyphCell[] = []
      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
          const alpha = maskPixels[(row * columnCount + column) * 4 + 3]
          if (alpha < inkThreshold) continue
          nextCells.push({
            column,
            row,
            glyphIndex: randomGlyphIndex(),
            phase: Math.random() * Math.PI * 2,
            revealAt: (column / columnCount) * 700 + Math.random() * 600,
            heat: 0,
          })
        }
      }

      canvas!.width = columnCount * cellSize
      canvas!.height = rowCount * cellSize
      canvas!.style.width = `${columnCount * cssCellSize}px`
      canvas!.style.height = `${rowCount * cssCellSize}px`
      inkAtlas = buildGlyphAtlas(cellSize, inkColor)
      highlightAtlas = buildGlyphAtlas(cellSize, highlightColor)
      hoverRadius = width * hoverRadiusRatio * devicePixelRatio
      cells = nextCells

      if (prefersReducedMotion) drawFrame(Number.POSITIVE_INFINITY, false)
    }

    function drawFrame(elapsed: number, isLive: boolean) {
      if (!inkAtlas || !highlightAtlas) return
      context.clearRect(0, 0, canvas!.width, canvas!.height)
      const time = elapsed / 1000
      const pointerX = pointer.x * devicePixelRatio
      const pointerY = pointer.y * devicePixelRatio

      for (const cell of cells) {
        if (elapsed < cell.revealAt) continue
        const left = cell.column * cellSize
        const top = cell.row * cellSize

        let proximity = 0
        if (pointer.active) {
          const distance = Math.hypot(left + cellSize / 2 - pointerX, top + cellSize / 2 - pointerY)
          proximity = Math.max(0, 1 - distance / hoverRadius)
        }
        cell.heat += (proximity - cell.heat) * 0.18

        if (isLive && Math.random() < 0.012 + cell.heat * 0.35) cell.glyphIndex = randomGlyphIndex()

        const breathing = 0.5 + 0.5 * Math.sin(time * 1.1 + cell.phase)
        const revealProgress = Math.min(1, (elapsed - cell.revealAt) / 400)
        context.globalAlpha = revealProgress * (0.4 + breathing * 0.5 + cell.heat * 0.6)
        const atlas = cell.heat > 0.35 ? highlightAtlas : inkAtlas
        context.drawImage(atlas, cell.glyphIndex * cellSize, 0, cellSize, cellSize, left, top, cellSize, cellSize)
      }
      context.globalAlpha = 1
    }

    function tick(now: number) {
      if (isDisposed) return
      if (isVisible) drawFrame(now - startedAt, true)
      animationFrame = requestAnimationFrame(tick)
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = pointer.x > -80 && pointer.y > -80 && pointer.x < bounds.width + 80 && pointer.y < bounds.height + 80
    }

    const resizeObserver = new ResizeObserver(() => {
      startedAt = performance.now() - 2000
      void rebuild()
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })

    startedAt = performance.now()
    void rebuild()
    resizeObserver.observe(host)
    visibilityObserver.observe(host)
    if (!prefersReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      animationFrame = requestAnimationFrame(tick)
    }

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [paintMask, inkColor, highlightColor, columns, minCellSize])

  return (
    <div ref={hostRef} className={`${styles.field} ${className ?? ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
