import { useEffect } from 'react'
import type { RefObject } from 'react'

type CountUpOptions = {
  target: number
  suffix?: string
  isActive: boolean
  delay?: number
  duration?: number
}

function easeOutQuart(progress: number) {
  return 1 - Math.pow(1 - progress, 4)
}

export function useCountUp(
  figureRef: RefObject<HTMLElement | null>,
  { target, suffix = '', isActive, delay = 0, duration = 1400 }: CountUpOptions,
) {
  useEffect(() => {
    const figure = figureRef.current
    if (!isActive || !figure) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const finalText = `${target}${suffix}`
    const startTime = performance.now() + delay
    let animationFrame = 0

    function paintFrame(now: number) {
      const progress = Math.min(1, Math.max(0, (now - startTime) / duration))
      figure!.textContent = `${Math.round(easeOutQuart(progress) * target)}${suffix}`
      if (progress < 1) animationFrame = requestAnimationFrame(paintFrame)
    }

    figure.textContent = `0${suffix}`
    animationFrame = requestAnimationFrame(paintFrame)

    return () => {
      cancelAnimationFrame(animationFrame)
      figure.textContent = finalText
    }
  }, [figureRef, target, suffix, isActive, delay, duration])
}
