import { useEffect, useRef } from 'react'
import { useIsPhone } from '../../hooks/useIsPhone'
import { useScrollLock } from '../../hooks/useScrollLock'
import { BrandLockup } from '../BrandLockup/BrandLockup'
import { PhoneMenu } from '../PhoneMenu/PhoneMenu'
import styles from './Nav.module.css'

const navLinks = [
  { href: '#top', label: 'Home' },
  { href: '#event', label: 'Event' },
  { href: '#packages', label: 'Packages' },
  { href: '#credits', label: 'AI Credits' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#faq', label: 'FAQ' },
]

const phoneMenuId = 'phone-menu'

type NavProps = {
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

export function Nav({ isMenuOpen, onMenuOpenChange }: NavProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const isPhone = useIsPhone()
  const isMenuShown = isMenuOpen && isPhone

  useScrollLock(isMenuShown)

  useEffect(() => {
    if (isMenuOpen && !isPhone) onMenuOpenChange(false)
  }, [isMenuOpen, isPhone, onMenuOpenChange])

  useEffect(() => {
    if (!isMenuShown) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      onMenuOpenChange(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuShown, onMenuOpenChange])

  return (
    <header className={`${styles.shell} ${isMenuShown ? styles.menuOpen : ''}`}>
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
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuShown}
          aria-controls={phoneMenuId}
          aria-label={isMenuShown ? 'Close menu' : 'Menu'}
          onClick={() => onMenuOpenChange(!isMenuOpen)}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>
      <PhoneMenu id={phoneMenuId} isOpen={isMenuShown} links={navLinks} onClose={() => onMenuOpenChange(false)} />
    </header>
  )
}
