import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { CharacterKind } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import styles from './Card.module.css'

type CardProps = {
  tint: string
  character?: CharacterKind
  badge?: ReactNode
  title: ReactNode
  children: ReactNode
  className?: string
  compactOnMobile?: boolean
}

export function Card({ tint, character, badge, title, children, className, compactOnMobile }: CardProps) {
  const cardClassName = [styles.card, compactOnMobile && styles.compact, className].filter(Boolean).join(' ')
  const cardRef = useRef<HTMLElement>(null)
  const isInView = useInView(cardRef)
  return (
    <article ref={cardRef} className={cardClassName} data-in-view={isInView}>
      <div className={styles.panel} style={{ background: tint }}>
        {character && <Character kind={character} size={92} className={styles.character} />}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </article>
  )
}
