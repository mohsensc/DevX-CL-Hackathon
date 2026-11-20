import { useMemo, useRef } from 'react'
import type { CSSProperties } from 'react'
import { memberCompanies, ycFounderAlum } from '../../content/event'
import { useInView } from '../../hooks/useInView'
import { useIsPhone } from '../../hooks/useIsPhone'
import styles from './AlumniBand.module.css'

type MemberCompany = (typeof memberCompanies)[number]

const desktopRowCount = 2
const phoneRowCount = 3
const founderCompany = memberCompanies.find((company) => company.name === ycFounderAlum.company)

function splitIntoRows(rowCount: number) {
  return Array.from({ length: rowCount }, (_, rowIndex) =>
    memberCompanies.filter((_, companyIndex) => companyIndex % rowCount === rowIndex),
  )
}

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

function FounderMark() {
  if (!founderCompany) return null
  return (
    <span className={styles.founderMark} aria-hidden="true">
      <img src={founderCompany.logo} alt="" className={styles.founderLogo} />
      <span className={styles.founderTag}>{ycFounderAlum.batch}</span>
    </span>
  )
}

export function AlumniBand() {
  const headerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const isPhone = useIsPhone()
  const isHeaderInView = useInView(headerRef)
  const isViewportInView = useInView(viewportRef)
  const logoRows = useMemo(() => splitIntoRows(isPhone ? phoneRowCount : desktopRowCount), [isPhone])

  return (
    <section className={styles.band} aria-labelledby="alumni-heading">
      <div ref={headerRef} className={styles.header} data-in-view={isHeaderInView}>
        <h2 id="alumni-heading" className={styles.title}>
          Where our active members have interned and founded
        </h2>
        <p className={styles.founder}>
          <FounderMark />
          <span className={styles.founderText}>
            Including <strong>{ycFounderAlum.name}</strong>, who went from {ycFounderAlum.club} to co-founding{' '}
            <strong>{ycFounderAlum.company}</strong> (<span className={styles.batch}>{ycFounderAlum.batch}</span>),
            formerly {ycFounderAlum.formerName}.
          </span>
        </p>
      </div>
      <div ref={viewportRef} className={styles.viewport} data-in-view={isViewportInView}>
        {logoRows.map((companies, rowIndex) => (
          <div
            key={rowIndex}
            className={`${styles.track} ${rowIndex % 2 === 1 ? styles.trackReverse : ''}`}
            style={{ '--row-index': rowIndex } as CSSProperties}
          >
            <LogoGroup companies={companies} />
            <LogoGroup companies={companies} isDuplicate />
          </div>
        ))}
      </div>
    </section>
  )
}
