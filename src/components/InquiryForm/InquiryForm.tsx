import { useState, type FormEvent } from 'react'
import { eventDetails, inquiryInterests } from '../../content/event'
import styles from './InquiryForm.module.css'

const emptyInquiry = { fullName: '', company: '', email: '', interest: inquiryInterests[0], message: '', website: '' }

type InquiryField = keyof typeof emptyInquiry
type SubmitStatus = 'idle' | 'sending' | 'sent'

function buildInquiryMailto(inquiry: typeof emptyInquiry) {
  const subject = `Sponsoring UCLA Startup Hacks: ${inquiry.company}`
  const body = [
    `Name: ${inquiry.fullName}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `Interested in: ${inquiry.interest}`,
    '',
    inquiry.message,
  ].join('\n')
  return `mailto:${eventDetails.sponsorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function InquiryForm() {
  const [inquiry, setInquiry] = useState(emptyInquiry)

  function updateField(field: InquiryField, value: string) {
    setInquiry((current) => ({ ...current, [field]: value }))
  }

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitStatus !== 'idle') return
    setSubmitStatus('sending')
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      })
      if (!response.ok) throw new Error(`Inquiry failed with ${response.status}`)
      setSubmitStatus('sent')
    } catch {
      setSubmitStatus('idle')
      window.location.href = buildInquiryMailto(inquiry)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Full name</span>
          <input
            className={styles.input}
            required
            autoComplete="name"
            value={inquiry.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Company</span>
          <input
            className={styles.input}
            required
            autoComplete="organization"
            value={inquiry.company}
            onChange={(event) => updateField('company', event.target.value)}
          />
        </label>
      </div>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            type="email"
            required
            autoComplete="email"
            value={inquiry.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Interested in</span>
          <select
            className={styles.input}
            value={inquiry.interest}
            onChange={(event) => updateField('interest', event.target.value)}
          >
            {inquiryInterests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>What does your team want out of the weekend?</span>
        <textarea
          className={`${styles.input} ${styles.message}`}
          rows={4}
          value={inquiry.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </label>
      <input
        className={styles.decoy}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={inquiry.website}
        onChange={(event) => updateField('website', event.target.value)}
      />
      <div className={styles.submitRow}>
        {submitStatus === 'sent' ? (
          <p className={styles.confirmation} role="status">
            Sent. We&rsquo;ll be in touch.
          </p>
        ) : (
          <button type="submit" className={styles.submitButton} disabled={submitStatus === 'sending'}>
            {submitStatus === 'sending' ? 'Sending' : 'Send'}
          </button>
        )}
      </div>
    </form>
  )
}
