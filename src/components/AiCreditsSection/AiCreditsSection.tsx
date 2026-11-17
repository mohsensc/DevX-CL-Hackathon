import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { creditOptions } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
import styles from './AiCreditsSection.module.css'

function formatOptionNumber(optionIndex: number) {
  return String(optionIndex + 1).padStart(2, '0')
}

export function AiCreditsSection() {
  const creditCardRef = useRef<HTMLDivElement>(null)
  const isCreditCardInView = useInView(creditCardRef)

  return (
    <Section id="credits" heading="Sponsor With AI Credits">
      <div ref={creditCardRef} className={styles.creditCard} data-in-view={isCreditCardInView}>
        <div className={styles.creditCopy}>
          <p className={styles.creditLead}>Got an API? Put it in 250 builders’ hands.</p>
          <p className={styles.creditBody}>
            If you make a model, a coding tool, or compute, send credits for the weekend. Every team gets them at
            Friday check-in, and they count toward any package.
          </p>
          <Character kind="pill" size={96} className={styles.creditCharacter} />
        </div>
        <ul className={styles.creditList}>
          {creditOptions.map((option, optionIndex) => (
            <li
              key={option.title}
              className={styles.creditItem}
              style={{ '--option-index': optionIndex } as CSSProperties}
            >
              <span className={styles.creditNumber} aria-hidden="true">
                {formatOptionNumber(optionIndex)}
              </span>
              <h3 className={styles.creditTitle}>{option.title}</h3>
              <p className={styles.creditDetail}>{option.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
