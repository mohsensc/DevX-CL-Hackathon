import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './PixelDivider.module.css'

type PixelDividerProps = {
  from: string
  to: string
}

type PixelGrid = {
  columnCount: number
  rowCount: number
}

const wideGrid: PixelGrid = { columnCount: 96, rowCount: 6 }
const phoneGrid: PixelGrid = { columnCount: 30, rowCount: 6 }

function seededNoise(column: number, row: number) {
  const value = Math.sin(column * 127.1 + row * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function buildPixelCells({ columnCount, rowCount }: PixelGrid) {
  return Array.from({ length: columnCount * rowCount }, (_, index) => {
    const column = index % columnCount
    const row = Math.floor(index / columnCount)
    const keepChance = 1 - (row + 0.5) / rowCount
    return { column, row, isFilled: seededNoise(column, row) < keepChance }
  }).filter((cell) => cell.isFilled)
}

const widePixelCells = buildPixelCells(wideGrid)
const phonePixelCells = buildPixelCells(phoneGrid)

function settleDelayStyle(column: number, row: number) {
  return { '--settle-delay': `${Math.round(row * 70 + seededNoise(row, column) * 260)}ms` } as CSSProperties
}

export function PixelDivider({ from, to }: PixelDividerProps) {
  const phoneDividerRef = useRef<SVGSVGElement>(null)
  const isPhoneDividerInView = useInView(phoneDividerRef, { rootMargin: '0px 0px -8% 0px' })

  return (
    <>
      <svg
        className={`${styles.divider} ${styles.wide}`}
        viewBox={`0 0 ${wideGrid.columnCount} ${wideGrid.rowCount}`}
        preserveAspectRatio="none"
        style={{ background: to }}
        aria-hidden="true"
      >
        {widePixelCells.map((cell) => (
          <rect key={`${cell.column}-${cell.row}`} x={cell.column} y={cell.row} width="1.02" height="1.02" fill={from} />
        ))}
      </svg>
      <svg
        ref={phoneDividerRef}
        className={`${styles.divider} ${styles.phone}`}
        viewBox={`0 0 ${phoneGrid.columnCount} ${phoneGrid.rowCount}`}
        preserveAspectRatio="none"
        style={{ background: to }}
        data-in-view={isPhoneDividerInView}
        aria-hidden="true"
      >
        {phonePixelCells.map((cell) => (
          <rect
            key={`${cell.column}-${cell.row}`}
            className={styles.pixel}
            style={settleDelayStyle(cell.column, cell.row)}
            x={cell.column}
            y={cell.row}
            width="1.02"
            height="1.02"
            fill={from}
          />
        ))}
      </svg>
    </>
  )
}
