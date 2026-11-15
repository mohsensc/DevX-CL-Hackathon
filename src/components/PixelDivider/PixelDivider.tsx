import styles from './PixelDivider.module.css'

type PixelDividerProps = {
  from: string
  to: string
}

const columnCount = 96
const rowCount = 6

function seededNoise(column: number, row: number) {
  const value = Math.sin(column * 127.1 + row * 311.7) * 43758.5453
  return value - Math.floor(value)
}

const pixelCells = Array.from({ length: columnCount * rowCount }, (_, index) => {
  const column = index % columnCount
  const row = Math.floor(index / columnCount)
  const keepChance = 1 - (row + 0.5) / rowCount
  return { column, row, isFilled: seededNoise(column, row) < keepChance }
}).filter((cell) => cell.isFilled)

export function PixelDivider({ from, to }: PixelDividerProps) {
  return (
    <svg
      className={styles.divider}
      viewBox={`0 0 ${columnCount} ${rowCount}`}
      preserveAspectRatio="none"
      style={{ background: to }}
      aria-hidden="true"
    >
      {pixelCells.map((cell) => (
        <rect key={`${cell.column}-${cell.row}`} x={cell.column} y={cell.row} width="1.02" height="1.02" fill={from} />
      ))}
    </svg>
  )
}
