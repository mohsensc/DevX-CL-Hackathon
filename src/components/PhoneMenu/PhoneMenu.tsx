import type { CSSProperties } from 'react'
import { eventDetails } from '../../content/event'
import { Smiley } from '../Smiley/Smiley'
import styles from './PhoneMenu.module.css'

type PhoneMenuLink = {
  href: string
  label: string
}

type PhoneMenuProps = {
  id: string
  isOpen: boolean
  links: PhoneMenuLink[]
  onClose: () => void
}

function staggerStyle(itemIndex: number) {
  return { '--item-index': itemIndex } as CSSProperties
}

export function PhoneMenu({ id, isOpen, links, onClose }: PhoneMenuProps) {
  return (
    <div id={id} className={`${styles.menu} ${isOpen ? styles.open : ''}`} inert={!isOpen}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glow} />
      </div>
      <nav className={styles.content} aria-label="Menu">
        <ol className={styles.links}>
          {links.map((link, linkIndex) => (
            <li key={link.href} className={styles.item} style={staggerStyle(linkIndex)}>
              <a href={link.href} className={styles.link} onClick={onClose}>
                <span className={styles.linkIndex} aria-hidden="true">
                  {String(linkIndex + 1).padStart(2, '0')}
                </span>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkArrow} aria-hidden="true">
                  ➔
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.footer}>
          <div className={styles.sun}>
            <Smiley size="100%" isActive={isOpen} />
          </div>
          <p className={styles.date} style={staggerStyle(links.length)}>
            {eventDetails.dateLabel}
          </p>
          <a
            href="#contact"
            className={styles.sponsorAction}
            style={staggerStyle(links.length + 1)}
            onClick={onClose}
          >
            Sponsor
            <span className={styles.sponsorArrow} aria-hidden="true">
              ➔
            </span>
          </a>
        </div>
      </nav>
    </div>
  )
}
