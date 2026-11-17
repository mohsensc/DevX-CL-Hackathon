import { Fragment, useRef } from 'react'
import { eventDetails } from '../../content/event'
import { phoneMediaQuery, useIsPhone } from '../../hooks/useIsPhone'
import { Countdown } from '../Countdown/Countdown'
import { GlyphField } from '../GlyphField/GlyphField'
import { paintDevxCross, paintDevxCrossBold } from '../GlyphField/maskPainters'
import { Smiley } from '../Smiley/Smiley'
import styles from './Hero.module.css'

const sponsorMailto = `mailto:${eventDetails.sponsorEmail}?subject=${encodeURIComponent('Sponsoring UCLA Startup Hacks')}`
const factItems = [eventDetails.dateLabel, ...eventDetails.venues]
const desktopGlyphColumns = 78
const phoneGlyphColumns = 44
const desktopGlyphInk = '#437ffe'
const phoneGlyphInk = '#6a9aff'
const smileyBoing = [
  { scale: '1 1', rotate: '0deg' },
  { scale: '1.22 0.78', rotate: '0deg', offset: 0.18 },
  { scale: '0.86 1.16', rotate: '200deg', offset: 0.5 },
  { scale: '1.06 0.95', rotate: '350deg', offset: 0.78 },
  { scale: '1 1', rotate: '360deg' },
]

export function Hero() {
  const isPhone = useIsPhone()
  const smileyBoingRef = useRef<HTMLDivElement>(null)

  function boingSmiley() {
    if (!matchMedia(phoneMediaQuery).matches) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    smileyBoingRef.current?.animate(smileyBoing, { duration: 900, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' })
  }

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.crossArt}>
        <GlyphField
          paintMask={isPhone ? paintDevxCrossBold : paintDevxCross}
          inkColor={isPhone ? phoneGlyphInk : desktopGlyphInk}
          columns={isPhone ? phoneGlyphColumns : desktopGlyphColumns}
        />
      </div>

      <div className={styles.smileyAnchor} onPointerDown={boingSmiley}>
        <div className={styles.smileyRoll}>
          <div ref={smileyBoingRef} className={styles.smileyBoing}>
            <Smiley size="100%" className={styles.heroSmiley} />
          </div>
        </div>
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
              {index > 0 && <span className={styles.factSeparator}> · </span>}
              <span className={styles.factItem}>{item}</span>
            </Fragment>
          ))}
        </p>

        <div className={styles.ctaRow}>
          <div className={styles.actions}>
            <a href={isPhone ? '#contact' : sponsorMailto} className={styles.primaryAction}>
              Sponsor the event
              <span className={styles.actionArrow} aria-hidden="true">
                →
              </span>
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
