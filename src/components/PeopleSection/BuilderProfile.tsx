import { useRef } from 'react'
import { builderProfile } from '../../content/event'
import type { CharacterKind } from '../../content/event'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { useIsPhone } from '../../hooks/useIsPhone'
import { Character } from '../Character/Character'
import { Rail } from '../Rail/Rail'
import styles from './PeopleSection.module.css'

const builderCount = 250
const profileCharacters: CharacterKind[] = ['star', 'pill', 'triangle', 'bubble']

export function BuilderProfile() {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef)
  const isPhone = useIsPhone()
  const countRef = useRef<HTMLSpanElement>(null)
  useCountUp(countRef, { target: builderCount, isActive: isPhone && isInView, duration: 1500 })

  return (
    <div ref={cardRef} className={styles.profileCard} data-in-view={isInView}>
      <Character kind="sun" size={84} className={styles.profileSun} />
      <h3 className={styles.cardTitle} aria-label={`The ${builderCount}`}>
        <span className={styles.titleLead}>The</span> <span ref={countRef} className={styles.titleCount}>
          {builderCount}
        </span>
      </h3>
      <Rail as="ul" label="Builder profiles" className={styles.profileList}>
        {builderProfile.map((profile, profileIndex) => (
          <li key={profile}>
            <span className={styles.profileText}>{profile}</span>
            <Character
              kind={profileCharacters[profileIndex % profileCharacters.length]}
              size={120}
              className={styles.profileCharacter}
            />
          </li>
        ))}
      </Rail>
    </div>
  )
}
