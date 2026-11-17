import { useRef } from 'react'
import { sponsorshipCovers } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import { Rail } from '../Rail/Rail'
import styles from './SponsorSection.module.css'

export function BuildersPayNothing() {
  const panelRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(panelRef)

  return (
    <div ref={panelRef} className={styles.freeForBuilders} data-in-view={isInView}>
      <Character kind="star" size={96} className={styles.freeCharacter} />
      <div>
        <h3 className={styles.freeTitle}>Builders pay nothing</h3>
        <p className={styles.freeBody}>
          Sponsors cover the whole weekend, so UCLA Startup Hacks stays free for every builder who gets in.
        </p>
      </div>
      <Rail as="ul" label="What sponsorship covers" className={styles.covers} motion="none" hasIndicator={false}>
        {sponsorshipCovers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Rail>
    </div>
  )
}
