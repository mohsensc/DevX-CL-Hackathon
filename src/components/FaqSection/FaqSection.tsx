import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { frequentQuestions } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
import styles from './FaqSection.module.css'

function formatQuestionNumber(questionIndex: number) {
  return String(questionIndex + 1).padStart(2, '0')
}

export function FaqSection() {
  const listRef = useRef<HTMLDivElement>(null)
  const isListInView = useInView(listRef)

  return (
    <Section id="faq" heading="FAQ">
      <div ref={listRef} className={styles.list} data-in-view={isListInView}>
        <div className={styles.onlookers} aria-hidden="true">
          <Character kind="triangle" size={84} className={styles.onlooker} />
          <Character kind="bubble" size={96} className={styles.onlooker} />
        </div>
        {frequentQuestions.map((item, questionIndex) => (
          <details
            key={item.question}
            className={styles.item}
            style={{ '--question-index': questionIndex } as CSSProperties}
          >
            <summary className={styles.question}>
              <span className={styles.number} aria-hidden="true">
                {formatQuestionNumber(questionIndex)}
              </span>
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
