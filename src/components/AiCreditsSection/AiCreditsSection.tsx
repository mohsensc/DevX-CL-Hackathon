import { creditOptions } from '../../content/event'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
import styles from './AiCreditsSection.module.css'

export function AiCreditsSection() {
  return (
    <Section id="credits" heading="Sponsor With AI Credits">
      <div className={styles.creditCard}>
        <div className={styles.creditCopy}>
          <p className={styles.creditLead}>Send API credits for our 250 builders.</p>
          <p className={styles.creditBody}>
            If your company offers a model API, a coding tool, or compute, send credits for the weekend. We hand them to
            every team at check-in on Friday, and they count toward any package.
          </p>
          <Character kind="pill" size={96} className={styles.creditCharacter} />
        </div>
        <ul className={styles.creditList}>
          {creditOptions.map((option) => (
            <li key={option.title} className={styles.creditItem}>
              <h3 className={styles.creditTitle}>{option.title}</h3>
              <p className={styles.creditDetail}>{option.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
