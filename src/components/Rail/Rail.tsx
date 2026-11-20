import { Children, createElement, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useIsPhone } from '../../hooks/useIsPhone'
import styles from './Rail.module.css'

type RailProps = {
  children: ReactNode
  label: string
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'dl'
  motion?: 'tilt' | 'none'
}

function measureItemFocus(track: HTMLElement, item: HTMLElement) {
  const viewStart = track.scrollLeft
  const viewEnd = viewStart + track.clientWidth
  const itemStart = item.offsetLeft
  const itemEnd = itemStart + item.offsetWidth
  const visibleWidth = Math.max(0, Math.min(itemEnd, viewEnd) - Math.max(itemStart, viewStart))
  const focus = item.offsetWidth > 0 ? Math.min(1, visibleWidth / item.offsetWidth) : 0
  const side = Math.sign((itemStart + itemEnd) / 2 - (viewStart + viewEnd) / 2)
  return { focus, side }
}

export function Rail({ children, label, className, as: trackTag = 'div', motion = 'tilt' }: RailProps) {
  const trackRef = useRef<HTMLElement>(null)
  const isPhone = useIsPhone()
  const itemCount = Children.count(children)

  useEffect(() => {
    const track = trackRef.current
    if (!isPhone || !track) return

    const items = Array.from(track.children) as HTMLElement[]
    let animationFrame = 0

    function syncPosition() {
      animationFrame = 0
      const scrollRange = track!.scrollWidth - track!.clientWidth
      const isAtEnd = scrollRange > 0 && track!.scrollLeft >= scrollRange - 2
      let activeIndex = 0
      let strongestFocus = -1

      items.forEach((item, itemIndex) => {
        const { focus, side } = measureItemFocus(track!, item)
        item.style.setProperty('--rail-focus', focus.toFixed(3))
        item.style.setProperty('--rail-side', String(side))
        if (focus > strongestFocus + 0.01 || (isAtEnd && focus >= strongestFocus - 0.01)) {
          strongestFocus = Math.max(focus, strongestFocus)
          activeIndex = itemIndex
        }
      })

      items.forEach((item, itemIndex) => {
        const activeValue = String(itemIndex === activeIndex)
        if (item.dataset.railActive !== activeValue) item.dataset.railActive = activeValue
      })
    }

    function requestSync() {
      if (!animationFrame) animationFrame = requestAnimationFrame(syncPosition)
    }

    syncPosition()
    track.addEventListener('scroll', requestSync, { passive: true })
    const resizeObserver = new ResizeObserver(requestSync)
    resizeObserver.observe(track)

    return () => {
      cancelAnimationFrame(animationFrame)
      track.removeEventListener('scroll', requestSync)
      resizeObserver.disconnect()
      items.forEach((item) => {
        item.style.removeProperty('--rail-focus')
        item.style.removeProperty('--rail-side')
        delete item.dataset.railActive
      })
    }
  }, [isPhone, itemCount])

  const trackClassName = [styles.track, motion === 'tilt' && styles.tilt, className].filter(Boolean).join(' ')

  return (
    <div className={styles.rail}>
      {createElement(
        trackTag,
        {
          ref: trackRef,
          className: trackClassName,
          tabIndex: isPhone ? 0 : undefined,
          role: trackTag === 'div' ? 'group' : undefined,
          'aria-label': label,
        },
        children,
      )}
    </div>
  )
}
