import { builderProfile, moreProjectsUrl, shippedApps } from '../../content/event'
import { CreativeLabsMark } from '../BrandLockup/BrandLockup'
import { Character } from '../Character/Character'
import { Section } from '../Section/Section'
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
        <div className={styles.profileCard}>
          <Character kind="sun" size={84} className={styles.profileSun} />
          <h3 className={styles.cardTitle}>The 250</h3>
          <ul className={styles.profileList}>
            {builderProfile.map((profile) => (
              <li key={profile}>{profile}</li>
            ))}
          </ul>
        </div>

        <div className={styles.organizerCard}>
          <div className={styles.organizerMarks} aria-hidden="true">
            <img src="/brand/devx-logo.png" alt="" className={styles.devxMark} />
            <span className={styles.markCross}>×</span>
            <CreativeLabsMark size={40} />
          </div>
          <h3 className={styles.cardTitle}>Run by DevX and Creative Labs</h3>
          <p className={styles.organizerBody}>
            DevX is UCLA’s product development organization. Creative Labs is UCLA’s home for creatives building
            technical and creative projects every quarter. Our organizers are experienced event planners who have run
            internal hackathons for both clubs.
          </p>

          <div className={styles.shipped}>
            <span className={styles.shippedLabel}>Shipped by our members</span>
            <ul className={styles.appList}>
              {shippedApps.map((app) => (
                <li key={app.name}>
                  <a href={app.url} target="_blank" rel="noreferrer" className={styles.app}>
                    <img src={app.icon} alt="" className={styles.appIcon} />
                    {app.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={moreProjectsUrl} target="_blank" rel="noreferrer" className={styles.app}>
                  and more ➔
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
