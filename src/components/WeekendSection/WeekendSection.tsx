import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { eventDetails, weekendSchedule } from '../../content/event'
import type { CharacterKind } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { Character } from '../Character/Character'
import { Rail } from '../Rail/Rail'
import { Section } from '../Section/Section'
import { DaySwitcher } from './DaySwitcher'
import { useActiveDay } from './useActiveDay'
import styles from './WeekendSection.module.css'

const dayCharacters: CharacterKind[] = ['star', 'sun', 'pill']

export function WeekendSection() {
  const scheduleRef = useRef<HTMLDivElement>(null)
  const isScheduleInView = useInView(scheduleRef)
  const { activeIndex, showDay } = useActiveDay(scheduleRef)

  return (
    <Section
      id="weekend"
      heading="The Weekend"
      intro={
        <p>
          {eventDetails.dateLabel} at {eventDetails.venues.join(' and ')}, {eventDetails.campus}. Teams build for 36
          hours and send their YC applications before Sunday’s 9&nbsp;AM code freeze.
        </p>
      }
    >
      <div ref={scheduleRef} className={styles.schedule} data-in-view={isScheduleInView}>
        <DaySwitcher days={weekendSchedule} activeIndex={activeIndex} onSelect={showDay} />
        <Rail label="Schedule" className={styles.days}>
          {weekendSchedule.map((day, dayIndex) => (
            <article key={day.day} className={styles.day} style={{ '--day-tint': day.tint } as CSSProperties} data-day-card>
              <header className={styles.dayHeader} style={{ background: day.tint }}>
                <h3 className={styles.dayName}>{day.day}</h3>
                <span className={styles.dayDate}>{day.date}</span>
                <Character kind={dayCharacters[dayIndex % dayCharacters.length]} size={96} className={styles.dayCharacter} />
              </header>
              <ol className={styles.timeline}>
                {day.items.map((item, slotIndex) => (
                  <li
                    key={item.time + item.label}
                    className={styles.slot}
                    style={{ '--slot-index': slotIndex } as CSSProperties}
                  >
                    <time className={styles.time}>{item.time}</time>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </Rail>
      </div>
    </Section>
  )
}
