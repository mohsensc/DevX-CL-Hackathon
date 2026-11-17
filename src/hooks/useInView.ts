import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

type InViewOptions = {
  once?: boolean
  rootMargin?: string
  threshold?: number
}

export function useInView(
  targetRef: RefObject<Element | null>,
  { once = true, rootMargin = '0px 0px -15% 0px', threshold = 0 }: InViewOptions = {},
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { rootMargin, threshold },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef, once, rootMargin, threshold])

  return isInView
}
