import { memberCompanies, ycFounderAlum } from '../../content/event'
import styles from './AlumniBand.module.css'

type MemberCompany = (typeof memberCompanies)[number]

const logoRows = [
  memberCompanies.filter((_, index) => index % 2 === 0),
  memberCompanies.filter((_, index) => index % 2 === 1),
]

function LogoGroup({ companies, isDuplicate = false }: { companies: MemberCompany[]; isDuplicate?: boolean }) {
  return (
    <ul className={styles.logoGroup} aria-hidden={isDuplicate || undefined}>
      {companies.map((company) => (
        <li key={company.name} className={styles.logoItem} title={company.name}>
          <img
            src={company.logo}
            alt={isDuplicate ? '' : `${company.name} logo`}
            style={{ height: company.height }}
            className={`${styles.logo} ${'monochrome' in company ? styles.monochrome : ''}`}
          />
          {'tag' in company && <span className={styles.logoTag}>{company.tag}</span>}
        </li>
      ))}
    </ul>
  )
}

export function AlumniBand() {
  return (
    <section className={styles.band} aria-labelledby="alumni-heading">
      <div className={styles.header}>
        <h2 id="alumni-heading" className={styles.title}>
          Where our active members have interned and founded
        </h2>
        <p className={styles.founder}>
          Including <strong>{ycFounderAlum.name}</strong>, who went from {ycFounderAlum.club} to co-founding{' '}
          <strong>{ycFounderAlum.company}</strong> (<span className={styles.batch}>{ycFounderAlum.batch}</span>), formerly{' '}
          {ycFounderAlum.formerName}.
        </p>
      </div>
      <div className={styles.viewport}>
        {logoRows.map((companies, rowIndex) => (
          <div key={rowIndex} className={`${styles.track} ${rowIndex === 1 ? styles.trackReverse : ''}`}>
            <LogoGroup companies={companies} />
            <LogoGroup companies={companies} isDuplicate />
          </div>
        ))}
      </div>
    </section>
  )
}
