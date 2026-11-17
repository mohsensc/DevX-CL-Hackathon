import { useCallback, useEffect, useState } from 'react'
import type { RefObject } from 'react'

function findDayCards(host: HTMLElement) {
  return Array.from(host.querySelectorAll<HTMLElement>('[data-day-card]'))
}

export function useActiveDay(hostRef: RefObject<HTMLElement | null>) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    function syncActiveDay() {
      const railActiveIndex = findDayCards(host!).findIndex((card) => card.dataset.railActive === 'true')
      if (railActiveIndex >= 0) setActiveIndex(railActiveIndex)
    }

    const observer = new MutationObserver(syncActiveDay)
    observer.observe(host, { attributes: true, attributeFilter: ['data-rail-active'], subtree: true })
    syncActiveDay()
    return () => observer.disconnect()
  }, [hostRef])

  const showDay = useCallback(
    (dayIndex: number) => {
      const card = hostRef.current && findDayCards(hostRef.current)[dayIndex]
      const track = card?.parentElement
      if (!card || !track) return
      const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
      const trackPadding = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0
      track.scrollTo({ left: card.offsetLeft - trackPadding, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    },
    [hostRef],
  )

  return { activeIndex, showDay }
}
