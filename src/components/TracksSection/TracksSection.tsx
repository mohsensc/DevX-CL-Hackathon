import { useRef } from 'react'
import { trackTeasers, ycRfsUrl } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
import styles from './TracksSection.module.css'

export function TracksSection() {
  const teaserRef = useRef<HTMLDivElement>(null)
  const isTeaserInView = useInView(teaserRef)

  return (
    <Section
      id="tracks"
      heading="Tracks"
      intro={
        <p>
          We’ll reveal the tracks once Y&nbsp;Combinator posts its Requests for Startups for Spring&nbsp;2027. Want a
          feel for what tech is blooming right now? Check out Winter’s list.{' '}
          <a href={ycRfsUrl} target="_blank" rel="noreferrer" className={styles.rfsLink}>
            See Winter’s RFS
          </a>
        </p>
      }
    >
      <div ref={teaserRef} className={styles.teaser} data-in-view={isTeaserInView}>
        <ul className={styles.teaserTiles} aria-hidden="true">
          {trackTeasers.map((teaser) => (
            <li key={teaser.character} className={styles.teaserTile} style={{ background: teaser.tint }}>
              <Character kind={teaser.character} size={72} className={styles.teaserCharacter} />
            </li>
          ))}
        </ul>
        <p className={styles.teaserNote}>Tracks revealed soon</p>
      </div>
    </Section>
  )
}
