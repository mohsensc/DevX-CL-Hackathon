import { useRef } from 'react'
import { sponsorReasons } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Rail } from '../Rail/Rail'
import styles from './SponsorSection.module.css'

export function SponsorReasons() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(headingRef)

  return (
    <div className={styles.reasonsGroup} data-in-view={isInView}>
      <h3 ref={headingRef} className={styles.subheading}>
        Why sponsor
      </h3>
      <Rail as="ol" label="Why sponsor" className={styles.reasons}>
        {sponsorReasons.map((reason, index) => (
          <li key={reason.title} className={styles.reason}>
            <span className={styles.reasonIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h4 className={styles.reasonTitle}>{reason.title}</h4>
            <p className={styles.reasonBody}>{reason.body}</p>
          </li>
        ))}
      </Rail>
    </div>
  )
}
