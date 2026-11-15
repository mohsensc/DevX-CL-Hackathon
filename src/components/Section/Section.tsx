import type { ReactNode } from 'react'
import styles from './Section.module.css'

type SectionProps = {
  id: string
  heading: string
  intro?: ReactNode
  children: ReactNode
}

export function Section({ id, heading, intro, children }: SectionProps) {
  const leadingWords = heading.split(' ')
  const lastWord = leadingWords.pop()
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.inner}>
        <h2 id={`${id}-heading`} className={styles.heading}>
          {leadingWords.length > 0 && `${leadingWords.join(' ')} `}
          <span className={styles.lastWord}>
            {lastWord}
            <span className={styles.arrow} aria-hidden="true">
              ➔
            </span>
          </span>
        </h2>
        {intro && <div className={styles.intro}>{intro}</div>}
        {children}
      </div>
    </section>
  )
}
