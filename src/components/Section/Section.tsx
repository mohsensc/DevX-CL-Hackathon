import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './Section.module.css'

type SectionProps = {
  id: string
  heading: string
  intro?: ReactNode
  children: ReactNode
}

const headingRevealMargin = '0px 0px -8% 0px'

export function Section({ id, heading, intro, children }: SectionProps) {
  const leadingWords = heading.split(' ')
  const lastWord = leadingWords.pop()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isHeadingInView = useInView(headingRef, { rootMargin: headingRevealMargin })
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`} data-in-view={isHeadingInView}>
      <div className={styles.inner}>
        <h2 ref={headingRef} id={`${id}-heading`} className={styles.heading}>
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
