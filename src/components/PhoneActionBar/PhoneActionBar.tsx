import { useEffect, useState } from 'react'
import { eventDetails } from '../../content/event'
import { Smiley } from '../Smiley/Smiley'
import styles from './PhoneActionBar.module.css'

type PhoneActionBarProps = {
  isSuppressed?: boolean
}

function useHeroOnScreen() {
  const [isOnScreen, setIsOnScreen] = useState(true)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting), {
      rootMargin: '-120px 0px 0px 0px',
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return isOnScreen
}

function useContactReached() {
  const [isReached, setIsReached] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return
    const observer = new IntersectionObserver(([entry]) =>
      setIsReached(entry.isIntersecting || entry.boundingClientRect.top < 0),
    )
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return isReached
}

export function PhoneActionBar({ isSuppressed = false }: PhoneActionBarProps) {
  const isHeroOnScreen = useHeroOnScreen()
  const isContactReached = useContactReached()
  const isShown = !isHeroOnScreen && !isContactReached && !isSuppressed

  return (
    <aside className={`${styles.shell} ${isShown ? styles.shown : ''}`} inert={!isShown} aria-label="Sponsor">
      <div className={styles.bar}>
        <div className={styles.sun}>
          <Smiley size="100%" isActive={isShown} />
        </div>
        <p className={styles.summary}>
          <span className={styles.eventName}>{eventDetails.name}</span>
          <span className={styles.eventDate}>{eventDetails.dateLabel}</span>
        </p>
        <a href="#contact" className={styles.action}>
          Sponsor
          <span className={styles.arrow} aria-hidden="true">
            ➔
          </span>
        </a>
      </div>
    </aside>
  )
}
