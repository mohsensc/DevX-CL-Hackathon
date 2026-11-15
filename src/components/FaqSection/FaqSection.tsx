import { frequentQuestions } from '../../content/event'
import { Section } from '../Section/Section'
import styles from './FaqSection.module.css'

export function FaqSection() {
  return (
    <Section id="faq" heading="FAQ">
      <div className={styles.list}>
        {frequentQuestions.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary className={styles.question}>
              {item.question}
              <span className={styles.toggle} aria-hidden="true" />
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
