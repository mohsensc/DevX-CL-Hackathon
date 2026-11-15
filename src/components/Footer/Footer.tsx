import { eventDetails } from '../../content/event'
import { BrandLockup } from '../BrandLockup/BrandLockup'
import styles from './Footer.module.css'

const footerColumns = [
  {
    heading: 'Explore',
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
    links: [
      { href: `mailto:${eventDetails.sponsorEmail}`, label: eventDetails.sponsorEmail },
      { href: 'https://www.instagram.com/ucladevx/', label: 'DevX Instagram' },
      { href: 'https://www.instagram.com/creativelabsucla/', label: 'Creative Labs Instagram' },
    ],
  },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandColumn}>
          <p className={styles.eventName}>{eventDetails.name}</p>
          <BrandLockup />
        </div>
        {footerColumns.map((column) => (
          <nav key={column.heading} className={styles.column} aria-label={column.heading}>
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
      </div>
    </footer>
  )
}
