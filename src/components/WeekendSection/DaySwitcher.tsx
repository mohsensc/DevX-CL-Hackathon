import type { CSSProperties } from 'react'
import styles from './WeekendSection.module.css'

type DaySwitcherProps = {
  days: { day: string; date: string; tint: string }[]
  activeIndex: number
  onSelect: (dayIndex: number) => void
}

export function DaySwitcher({ days, activeIndex, onSelect }: DaySwitcherProps) {
  const switcherStyle = {
    '--day-count': days.length,
    '--active-day': activeIndex,
    '--active-tint': days[activeIndex].tint,
  } as CSSProperties

  return (
    <div className={styles.switcher} style={switcherStyle} role="group" aria-label="Days">
      <span className={styles.switcherThumb} aria-hidden="true" />
      {days.map((day, dayIndex) => (
        <button
          key={day.day}
          type="button"
          className={styles.switcherDay}
          aria-pressed={dayIndex === activeIndex}
          aria-label={`${day.day}, ${day.date}`}
          onClick={() => onSelect(dayIndex)}
        >
          <span className={styles.switcherName}>{day.day.slice(0, 3)}</span>
          <span className={styles.switcherDate}>{day.date.split(' ')[1]}</span>
        </button>
      ))}
    </div>
  )
}
