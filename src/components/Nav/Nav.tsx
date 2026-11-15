import { BrandLockup } from '../BrandLockup/BrandLockup'
import styles from './Nav.module.css'

const navLinks = [
  { href: '#event', label: 'Event' },
  { href: '#packages', label: 'Packages' },
  { href: '#credits', label: 'AI Credits' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  return (
    <header className={styles.shell}>
      <nav className={styles.bar} aria-label="Main">
        <div className={styles.brand}>
          <BrandLockup compact />
        </div>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className={styles.sponsorAction}>
          Sponsor
        </a>
      </nav>
    </header>
  )
}
