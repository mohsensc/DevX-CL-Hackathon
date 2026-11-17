import { useRef } from 'react'
import { moreProjectsUrl, shippedApps } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { CreativeLabsMark } from '../BrandLockup/BrandLockup'
import styles from './PeopleSection.module.css'

export function OrganizerCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef)

  return (
    <div ref={cardRef} className={styles.organizerCard} data-in-view={isInView}>
      <div className={styles.organizerMarks} aria-hidden="true">
        <img src="/brand/devx-logo.png" alt="" className={styles.devxMark} />
        <span className={styles.markCross}>×</span>
        <span className={styles.creativeLabsMark}>
          <CreativeLabsMark size={40} />
        </span>
      </div>
      <h3 className={styles.cardTitle}>Run by DevX and Creative Labs</h3>
      <p className={styles.organizerBody}>
        DevX is UCLA’s product development organization. Creative Labs is UCLA’s home for creatives building
        technical and creative projects every quarter. Our organizers are experienced event planners who have run
        internal hackathons for both clubs.
      </p>

      <div className={styles.shipped}>
        <span className={styles.shippedLabel}>Shipped by our members</span>
        <ul className={styles.appList}>
          {shippedApps.map((app) => (
            <li key={app.name}>
              <a href={app.url} target="_blank" rel="noreferrer" className={styles.app}>
                <img src={app.icon} alt="" className={styles.appIcon} />
                {app.name}
              </a>
            </li>
          ))}
          <li>
            <a href={moreProjectsUrl} target="_blank" rel="noreferrer" className={styles.app}>
              and more ➔
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
