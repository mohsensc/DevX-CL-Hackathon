import { tracks, ycRfsUrl } from '../../content/event'
import { Card } from '../Card/Card'
import { Rail } from '../Rail/Rail'
import { Section } from '../Section/Section'
import styles from './TracksSection.module.css'

function formatTrackNumber(trackIndex: number) {
  return String(trackIndex + 1).padStart(2, '0')
}

function TrackSources({ sources }: { sources: string[] }) {
  return (
    <>
      <p className={styles.sources}>From YC’s requests: {sources.join(', ')}</p>
      <div className={styles.sourceBlock}>
        <span className={styles.sourceLabel}>From YC’s requests</span>
        <ul className={styles.sourceList}>
          {sources.map((source) => (
            <li key={source} className={styles.sourceItem}>
              {source}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function TracksSection() {
  return (
    <Section
      id="tracks"
      heading="Tracks"
      intro={
        <p>
          Every track comes from Y&nbsp;Combinator’s Winter 2027 Requests for Startups. Gold and Title sponsors get
          their name on one.{' '}
          <a href={ycRfsUrl} target="_blank" rel="noreferrer" className={styles.rfsLink}>
            Read YC’s RFS
          </a>
        </p>
      }
    >
      <Rail label="Tracks" className={styles.grid}>
        {tracks.map((track, trackIndex) => (
          <Card
            key={track.name}
            tint={track.tint}
            character={track.character}
            title={track.name}
            badge={<span className={styles.trackNumber}>{formatTrackNumber(trackIndex)}</span>}
            className={styles.trackCard}
          >
            <p>{track.description}</p>
            <TrackSources sources={track.sources} />
          </Card>
        ))}
      </Rail>
    </Section>
  )
}
