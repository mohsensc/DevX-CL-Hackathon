import type { ReactNode } from 'react'
import type { CharacterKind } from '../../content/event'

type CharacterProps = {
  kind: CharacterKind
  size?: number
  className?: string
}

const outline = { stroke: 'var(--cl-ink)', strokeWidth: 2.4, strokeLinejoin: 'round' as const }

function Face({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="-4.5" cy="0" r="1.7" fill="var(--cl-ink)" />
      <circle cx="4.5" cy="0" r="1.7" fill="var(--cl-ink)" />
      <path d="M-7 5 Q0 9.5 7 5" fill="none" stroke="var(--cl-ink)" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  )
}

const shapes: Record<CharacterKind, ReactNode> = {
  sun: (
    <>
      <circle cx="50" cy="50" r="40" fill="var(--cl-sun)" {...outline} />
      <Face x={58} y={40} scale={1.3} />
    </>
  ),
  star: (
    <>
      <path
        d="M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36 Z"
        fill="var(--cl-sun)"
        {...outline}
      />
      <Face x={50} y={50} />
    </>
  ),
  pill: (
    <>
      <rect x="30" y="10" width="40" height="84" rx="20" fill="var(--cl-bubblegum)" {...outline} />
      <Face x={50} y={36} />
    </>
  ),
  triangle: (
    <>
      <path d="M50 12 L92 90 L8 90 Z" fill="var(--cl-peach)" {...outline} />
      <Face x={50} y={64} />
    </>
  ),
  bubble: (
    <>
      <path d="M12 94 A38 38 0 0 1 88 94 Z" fill="var(--cl-lilac)" {...outline} />
      <Face x={50} y={74} />
    </>
  ),
}

export function Character({ kind, size = 88, className }: CharacterProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" overflow="visible">
      {shapes[kind]}
    </svg>
  )
}
