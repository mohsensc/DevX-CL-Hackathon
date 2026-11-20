import { sponsorTiers } from '../../content/event'
import { Card } from '../Card/Card'
import { Rail } from '../Rail/Rail'
import { Section } from '../Section/Section'
import { SponsorshipCovers } from './SponsorshipCovers'
import { SponsorReasons } from './SponsorReasons'
import styles from './SponsorSection.module.css'

export function SponsorSection() {
  return (
    <Section
      id="packages"
      heading="Packages"
      intro={
        <p>
          Every package gets your team in the room with 250 builders. Pick one, or email us and we’ll make one that
          fits.
        </p>
      }
    >
      <Rail label="Packages" className={styles.tiers}>
        {sponsorTiers.map((tier) => (
          <Card
            key={tier.name}
            tint={tier.tint}
            character={tier.character}
            badge={tier.price}
            title={tier.name}
            className={styles.tierCard}
          >
            <ul className={styles.perks}>
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </Card>
        ))}
      </Rail>
      <p className={styles.revealSoon}>Sponsors will be revealed soon</p>
      <p className={styles.inKind}>AI credits, API access, hardware, and prizes count toward any package.</p>

      <SponsorshipCovers />
      <SponsorReasons />
    </Section>
  )
}
