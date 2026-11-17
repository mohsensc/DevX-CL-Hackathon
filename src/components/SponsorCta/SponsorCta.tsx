import { Fragment, useRef } from 'react'
import { eventDetails } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { GlyphField } from '../GlyphField/GlyphField'
import { paintSmiley } from '../GlyphField/maskPainters'
import { InquiryForm } from '../InquiryForm/InquiryForm'
import styles from './SponsorCta.module.css'

const sponsorMailto = `mailto:${eventDetails.sponsorEmail}?subject=${encodeURIComponent('Sponsoring UCLA Startup Hacks')}`
const detailItems = [eventDetails.dateLabel, ...eventDetails.venues]

export function SponsorCta() {
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef)

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading" data-in-view={isInView}>
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="contact-heading" className={styles.heading}>
            Let’s make something cool.
          </h2>
          <p className={styles.lead}>
            Tell us what your team wants out of the weekend and we’ll build a package around it.
          </p>
          <p className={styles.details}>
            {detailItems.map((item, index) => (
              <Fragment key={item}>
                {index > 0 && <span className={styles.detailSeparator}> · </span>}
                <span className={styles.detailItem}>{item}</span>
              </Fragment>
            ))}
          </p>
          <InquiryForm />
          <a href={sponsorMailto} className={styles.emailAddress}>
            Or email {eventDetails.sponsorEmail}
          </a>
        </div>
        <div className={styles.smileyField}>
          <GlyphField paintMask={paintSmiley} inkColor="#fff740" columns={64} minCellSize={7} />
        </div>
      </div>
    </section>
  )
}
