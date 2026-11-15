import { eventFacts } from '../../content/event'
import { Section } from '../Section/Section'
import styles from './EventSection.module.css'

export function EventSection() {
  return (
    <Section
      id="event"
      heading="The Event"
      intro={
        <p>
          UCLA Startup Hacks is a weekend hackathon run by DevX and Creative Labs. Teams pick a track based on
          Y&nbsp;Combinator’s Requests for Startups, build a working AI product, and submit a YC application for the Spring&nbsp;2027 batch before the
          weekend ends. Sponsors meet the teams in person and see their tools used in what gets built.
        </p>
      }
    >
      <dl className={styles.facts}>
        {eventFacts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factValue}>{fact.value}</dt>
            <dd className={styles.factLabel}>{fact.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
