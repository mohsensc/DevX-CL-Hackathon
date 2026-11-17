import { useEffect, useState } from 'react'
import styles from './Countdown.module.css'

const unitLabels = ['weeks', 'days', 'hrs', 'min', 'sec'] as const

function splitRemaining(targetTime: number) {
  const remaining = Math.max(0, targetTime - Date.now())
  const totalSeconds = Math.floor(remaining / 1000)
  const totalDays = Math.floor(totalSeconds / 86400)
  return [
    Math.floor(totalDays / 7),
    totalDays % 7,
    Math.floor((totalSeconds % 86400) / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60,
  ]
}

export function Countdown({ target }: { target: string }) {
  const targetTime = new Date(target).getTime()
  const [remainingParts, setRemainingParts] = useState(() => splitRemaining(targetTime))
  const [weeks, days] = remainingParts

  useEffect(() => {
    const interval = window.setInterval(() => setRemainingParts(splitRemaining(targetTime)), 1000)
    return () => window.clearInterval(interval)
  }, [targetTime])

  return (
    <div className={styles.countdown} role="timer" aria-label={`${weeks} weeks and ${days} days until kickoff`}>
      {remainingParts.map((value, index) => (
        <div key={unitLabels[index]} className={styles.unit} aria-hidden="true">
          <span key={value} className={styles.value}>{String(value).padStart(2, '0')}</span>
          <span className={styles.label}>{unitLabels[index]}</span>
        </div>
      ))}
    </div>
  )
}
