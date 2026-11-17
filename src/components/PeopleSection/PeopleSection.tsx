import { Section } from '../Section/Section'
import { BuilderProfile } from './BuilderProfile'
import { OrganizerCard } from './OrganizerCard'
import styles from './PeopleSection.module.css'

export function PeopleSection() {
  return (
    <Section
      id="people"
      heading="Who You Will Meet"
      intro={
        <p>
          You will meet 250 builders who already ship and want to start a company. Most of them will be
          picking their AI tools for the weekend on Friday night.
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
