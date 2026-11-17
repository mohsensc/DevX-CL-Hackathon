import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { eventFacts } from '../../content/event'
import type { CharacterKind } from '../../content/event'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { useIsPhone } from '../../hooks/useIsPhone'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
import styles from './EventSection.module.css'

const factCharacters: CharacterKind[] = ['star', 'bubble', 'triangle']
const factStaggerMs = 130

type FactFigureProps = {
  value: string
  isCounting: boolean
  delay: number
}

function splitFactValue(value: string) {
  const [, digits = '', suffix = '', unit = ''] = value.match(/^(\d+)(\S*)\s*(.*)$/) ?? []
  return { target: Number(digits), suffix, unit }
}

function FactFigure({ value, isCounting, delay }: FactFigureProps) {
  const figureRef = useRef<HTMLSpanElement>(null)
  const { target, suffix, unit } = splitFactValue(value)
  useCountUp(figureRef, { target, suffix, isActive: isCounting, delay })
  return (
    <>
      <span ref={figureRef} className={styles.factFigure}>
        {`${target}${suffix}`}
      </span>
      {unit && (
        <>
          {' '}
          <span className={styles.factUnit}>{unit}</span>
        </>
      )}
    </>
  )
}

export function EventSection() {
  const factsRef = useRef<HTMLDListElement>(null)
  const areFactsInView = useInView(factsRef)
  const isPhone = useIsPhone()

  return (
    <Section
      id="event"
      heading="The Event"
      intro={
        <p>
          UCLA Startup Hacks is a weekend hackathon by DevX and Creative Labs for UCLA creators and entrepreneurs who
          want to put something out into the world. Teams pick a track from Y&nbsp;Combinator’s Requests for Startups,
          build a real AI product, and send in a YC application for Spring&nbsp;2027 before Sunday’s code freeze. You
          meet them in person and watch your tools get used.
        </p>
      }
    >
      <dl ref={factsRef} className={styles.facts} data-in-view={areFactsInView}>
        {eventFacts.map((fact, factIndex) => (
          <div key={fact.label} className={styles.fact} style={{ '--fact-index': factIndex } as CSSProperties}>
            <dt className={styles.factValue}>
              <FactFigure
                value={fact.value}
                isCounting={isPhone && areFactsInView}
                delay={factIndex * factStaggerMs + 200}
              />
              <Character kind={factCharacters[factIndex % factCharacters.length]} size={96} className={styles.factCharacter} />
            </dt>
            <dd className={styles.factLabel}>{fact.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
