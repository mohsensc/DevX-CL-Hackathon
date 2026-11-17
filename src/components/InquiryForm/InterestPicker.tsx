import { inquiryInterests } from '../../content/event'
import { useIsPhone } from '../../hooks/useIsPhone'
import styles from './InquiryForm.module.css'

type InterestPickerProps = {
  selectedInterest: string
  onSelect: (interest: string) => void
}

export function InterestPicker({ selectedInterest, onSelect }: InterestPickerProps) {
  const isPhone = useIsPhone()

  if (!isPhone) {
    return (
      <label className={styles.field}>
        <span className={styles.label}>Interested in</span>
        <select className={styles.input} value={selectedInterest} onChange={(event) => onSelect(event.target.value)}>
          {inquiryInterests.map((interest) => (
            <option key={interest}>{interest}</option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>Interested in</legend>
      <div className={styles.interestChips}>
        {inquiryInterests.map((interest) => (
          <label key={interest} className={styles.interestChip}>
            <input
              className={styles.interestRadio}
              type="radio"
              name="interest"
              value={interest}
              checked={selectedInterest === interest}
              onChange={() => onSelect(interest)}
            />
            <span className={styles.interestLabel}>{interest}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
