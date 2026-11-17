import { useRef } from 'react'
import { eventDetails } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { useIsPhone } from '../../hooks/useIsPhone'
import { BrandLockup } from '../BrandLockup/BrandLockup'
import { Smiley } from '../Smiley/Smiley'
import styles from './Footer.module.css'

const footerColumns = [
  {
    heading: 'Explore',
    phoneLayout: styles.chips,
    links: [
      { href: '#event', label: 'Event' },
      { href: '#packages', label: 'Packages' },
      { href: '#credits', label: 'AI Credits' },
      { href: '#tracks', label: 'Tracks' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Contact',
    phoneLayout: styles.rows,
    links: [
      { href: `mailto:${eventDetails.sponsorEmail}`, label: eventDetails.sponsorEmail },
      { href: 'https://www.instagram.com/ucladevx/', label: 'DevX Instagram' },
      { href: 'https://www.instagram.com/creativelabsucla/', label: 'Creative Labs Instagram' },
    ],
  },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef)
  const isPhone = useIsPhone()

  return (
    <footer ref={footerRef} className={styles.footer} data-in-view={isInView}>
      <span className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <p className={styles.eventName}>{eventDetails.name}</p>
          <BrandLockup />
          <span className={styles.sun}>
            <Smiley size="100%" isActive={isPhone} />
          </span>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.heading} className={`${styles.column} ${column.phoneLayout}`} aria-label={column.heading}>
            <h2 className={styles.columnHeading}>{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.baseline}>
        <p>Made with ❤️ by DevX × Creative Labs</p>
        <p>Independently organized by UCLA student clubs. Not affiliated with Y Combinator.</p>
        <a className={styles.backToTop} href="#top" aria-label="Back to top">
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
