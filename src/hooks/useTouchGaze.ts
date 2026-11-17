import { useEffect } from 'react'

export function useTouchGaze() {
  useEffect(() => {
    if (!matchMedia('(pointer: coarse)').matches) return

    function relayTouchAsPointer(event: TouchEvent) {
      const touch = event.touches[0]
      if (!touch) return
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: touch.clientX, clientY: touch.clientY }))
    }

    window.addEventListener('touchstart', relayTouchAsPointer, { passive: true })
    window.addEventListener('touchmove', relayTouchAsPointer, { passive: true })
    return () => {
      window.removeEventListener('touchstart', relayTouchAsPointer)
      window.removeEventListener('touchmove', relayTouchAsPointer)
    }
  }, [])
}
