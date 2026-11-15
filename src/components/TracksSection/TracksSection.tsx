import { tracks, ycRfsUrl } from '../../content/event'
import { Card } from '../Card/Card'
import { Section } from '../Section/Section'
import styles from './TracksSection.module.css'

export function TracksSection() {
  return (
    <Section
      id="tracks"
      heading="Tracks"
      intro={
        <p>
          Every track comes from Y&nbsp;Combinator’s Winter 2027 Requests for Startups. Gold and Title sponsors can put
          their name on a track.{' '}
          <a href={ycRfsUrl} target="_blank" rel="noreferrer" className={styles.rfsLink}>
            Read YC’s RFS
          </a>
        </p>
      }
    >
      <div className={styles.grid}>
        {tracks.map((track) => (
          <Card key={track.name} tint={track.tint} character={track.character} title={track.name} compactOnMobile>
            <p>{track.description}</p>
            <p className={styles.sources}>From: {track.sources.join(', ')}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
