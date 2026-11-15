import { sponsorReasons, sponsorshipCovers, sponsorTiers } from '../../content/event'
import { Card } from '../Card/Card'
import { Section } from '../Section/Section'
import styles from './SponsorSection.module.css'

export function SponsorSection() {
  return (
    <Section
      id="packages"
      heading="Packages"
      intro={
        <p>
          Every package puts your team on the floor with 250 builders. Pick one below, or email us and we will put
          together a custom one.
        </p>
      }
    >
      <div className={styles.tiers}>
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
      </div>
      <p className={styles.inKind}>AI credits, API access, hardware, and prizes count toward any package.</p>

      <div className={styles.freeForBuilders}>
        <div>
          <h3 className={styles.freeTitle}>Builders pay nothing</h3>
          <p className={styles.freeBody}>
            Sponsors cover the whole weekend, so UCLA Startup Hacks stays free for every builder who gets in.
          </p>
        </div>
        <ul className={styles.covers} aria-label="What sponsorship covers">
          {sponsorshipCovers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <h3 className={styles.subheading}>Why sponsor</h3>
      <ol className={styles.reasons}>
        {sponsorReasons.map((reason, index) => (
          <li key={reason.title} className={styles.reason}>
            <span className={styles.reasonIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h4 className={styles.reasonTitle}>{reason.title}</h4>
            <p className={styles.reasonBody}>{reason.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
