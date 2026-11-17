import { useLayoutEffect } from 'react'

export function useScrollLock(isLocked: boolean) {
  useLayoutEffect(() => {
    if (!isLocked) return
    document.documentElement.classList.add('scrollLocked')
    return () => document.documentElement.classList.remove('scrollLocked')
  }, [isLocked])
}
