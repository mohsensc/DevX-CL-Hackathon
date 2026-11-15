import { eventDetails, weekendSchedule } from '../../content/event'
import { Section } from '../Section/Section'
import styles from './WeekendSection.module.css'

export function WeekendSection() {
  return (
    <Section
      id="weekend"
      heading="The Weekend"
      intro={
        <p>
          {eventDetails.dateLabel} at {eventDetails.venues.join(' and ')}, {eventDetails.campus}. Teams build for 36
          hours and submit their YC applications by the Sunday morning code freeze.
        </p>
      }
    >
      <div className={styles.days}>
        {weekendSchedule.map((day) => (
          <article key={day.day} className={styles.day}>
            <header className={styles.dayHeader} style={{ background: day.tint }}>
              <h3 className={styles.dayName}>{day.day}</h3>
              <span className={styles.dayDate}>{day.date}</span>
            </header>
            <ol className={styles.timeline}>
              {day.items.map((item) => (
                <li key={item.time + item.label} className={styles.slot}>
                  <time className={styles.time}>{item.time}</time>
                  <span>{item.label}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  )
}
