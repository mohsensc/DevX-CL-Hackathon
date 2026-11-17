import { Section } from '../Section/Section'
import { BuilderProfile } from './BuilderProfile'
import { OrganizerCard } from './OrganizerCard'
import styles from './PeopleSection.module.css'

export function PeopleSection() {
  return (
    <Section
      id="people"
      heading="Who You’ll Meet"
      intro={
        <p>
          250 builders who already ship and want to start something. On Friday night they pick the AI tools
          they’ll use all weekend.
        </p>
      }
    >
      <div className={styles.layout}>
        <BuilderProfile />
        <OrganizerCard />
      </div>
    </Section>
  )
}
