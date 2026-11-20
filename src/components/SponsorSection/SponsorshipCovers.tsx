import { useRef } from 'react'
import { sponsorshipCovers } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Rail } from '../Rail/Rail'
import styles from './SponsorSection.module.css'

export function SponsorshipCovers() {
  const panelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(panelRef)

  return (
    <div ref={panelRef} className={styles.freeForBuilders} data-in-view={isInView}>
      <p className={styles.coversLabel}>Sponsors cover</p>
      <Rail as="ul" label="What sponsorship covers" className={styles.covers} motion="none">
        {sponsorshipCovers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Rail>
    </div>
  )
}
