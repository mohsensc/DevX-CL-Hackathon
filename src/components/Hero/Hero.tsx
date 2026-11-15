import { Fragment } from 'react'
import { eventDetails } from '../../content/event'
import { Countdown } from '../Countdown/Countdown'
import { GlyphField } from '../GlyphField/GlyphField'
import { paintDevxCross } from '../GlyphField/maskPainters'
import { Smiley } from '../Smiley/Smiley'
import styles from './Hero.module.css'

const sponsorMailto = `mailto:${eventDetails.sponsorEmail}?subject=${encodeURIComponent('Sponsoring UCLA Startup Hacks')}`
const factItems = [eventDetails.dateLabel, ...eventDetails.venues]

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.crossArt}>
        <GlyphField paintMask={paintDevxCross} inkColor="#437ffe" columns={78} />
      </div>

      <div className={styles.smileyAnchor}>
        <Smiley size="100%" />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>UCLA</span>
          <span>Startup</span>
          <span className={styles.titleAccent}>Hacks</span>
        </h1>
        <p className={styles.tagline}>{eventDetails.tagline}</p>
        <p className={styles.facts}>
          {factItems.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && ' · '}
              <span className={styles.factItem}>{item}</span>
            </Fragment>
          ))}
        </p>

        <div className={styles.ctaRow}>
          <div className={styles.actions}>
          <a href={sponsorMailto} className={styles.primaryAction}>
            Sponsor the event
          </a>
            <a href="#packages" className={styles.secondaryAction}>
              See packages
            </a>
          </div>
          <Countdown target={eventDetails.startsAt} />
        </div>
      </div>
    </section>
  )
}
