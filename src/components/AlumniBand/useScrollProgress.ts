import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useScrollProgress(targetRef: RefObject<HTMLElement | null>, isEnabled: boolean, propertyName: string) {
  useEffect(() => {
    const target = targetRef.current
    if (!isEnabled || !target || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let animationFrame = 0

    function syncProgress() {
      animationFrame = 0
      const bounds = target!.getBoundingClientRect()
      const travel = innerHeight + bounds.height
      const progress = Math.min(1, Math.max(0, (innerHeight - bounds.top) / travel))
      target!.style.setProperty(propertyName, progress.toFixed(4))
    }

    function requestSync() {
      if (!animationFrame) animationFrame = requestAnimationFrame(syncProgress)
    }

    syncProgress()
    addEventListener('scroll', requestSync, { passive: true })
    addEventListener('resize', requestSync)

    return () => {
      cancelAnimationFrame(animationFrame)
      removeEventListener('scroll', requestSync)
      removeEventListener('resize', requestSync)
      target.style.removeProperty(propertyName)
    }
  }, [targetRef, isEnabled, propertyName])
}
