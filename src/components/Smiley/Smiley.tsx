import { useEffect, useRef } from 'react'
import { phoneMediaQuery } from '../../hooks/useIsPhone'
import styles from './Smiley.module.css'

type SmileyProps = {
  size?: number | string
  className?: string
  isActive?: boolean
}

const sunSize = 224
const centeredFace = { left: 70, top: 97 }
const restingOffset = { x: 97 - centeredFace.left, y: 68 - centeredFace.top }
const maxFaceTravel = 55
const followSpeed = 14
const wanderSpeed = 3.2
const wanderIntervalMs = 2400
const wanderPauseAfterTouchMs = 1800

function toPercent(value: number) {
  return `${(value / sunSize) * 100}%`
}

export function Smiley({ size = 224, className, isActive = true }: SmileyProps) {
  const sunRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const sun = sunRef.current
    const face = faceRef.current
    if (!sun || !face) return

    const current = { ...restingOffset }
    const target = { ...restingOffset }
    let animationFrame = 0
    let lastFrameTime = 0
    let activeSpeed = followSpeed
    let lastPointerTime = Number.NEGATIVE_INFINITY
    let isOnScreen = true

    function renderFace() {
      const sunWidth = matchMedia(phoneMediaQuery).matches ? sun!.offsetWidth : sun!.getBoundingClientRect().width
      const scale = sunWidth / sunSize
      face!.style.transform = `translate3d(${current.x * scale}px, ${current.y * scale}px, 0)`
    }

    renderFace()
    if (!isActive || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function step(time: number) {
      const elapsedSeconds = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 1 / 60
      lastFrameTime = time
      const easing = 1 - Math.exp(-activeSpeed * elapsedSeconds)
      current.x += (target.x - current.x) * easing
      current.y += (target.y - current.y) * easing
      renderFace()

      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        animationFrame = requestAnimationFrame(step)
      } else {
        animationFrame = 0
        lastFrameTime = 0
      }
    }

    function handlePointerMove(event: PointerEvent) {
      const bounds = sun!.getBoundingClientRect()
      if (bounds.width === 0) return
      lastPointerTime = performance.now()
      activeSpeed = followSpeed
      const scale = bounds.width / sunSize
      const deltaX = (event.clientX - (bounds.left + bounds.width / 2)) / scale
      const deltaY = (event.clientY - (bounds.top + bounds.height / 2)) / scale
      const distance = Math.hypot(deltaX, deltaY)
      const reach = distance < maxFaceTravel ? 1 : maxFaceTravel / distance
      target.x = deltaX * reach
      target.y = deltaY * reach
      if (!animationFrame) animationFrame = requestAnimationFrame(step)
    }

    function wander() {
      if (!isOnScreen || document.hidden) return
      if (performance.now() - lastPointerTime < wanderPauseAfterTouchMs) return
      const angle = Math.random() * Math.PI * 2
      const reach = maxFaceTravel * (0.3 + Math.random() * 0.6)
      const isReturningHome = Math.random() < 0.3
      target.x = isReturningHome ? restingOffset.x : Math.cos(angle) * reach
      target.y = isReturningHome ? restingOffset.y : Math.sin(angle) * reach
      activeSpeed = wanderSpeed
      if (!animationFrame) animationFrame = requestAnimationFrame(step)
    }

    const isTouchDevice = matchMedia('(pointer: coarse)').matches
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting
    })
    const wanderInterval = isTouchDevice ? window.setInterval(wander, wanderIntervalMs) : 0
    if (isTouchDevice) visibilityObserver.observe(sun)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('resize', renderFace)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.clearInterval(wanderInterval)
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', renderFace)
    }
  }, [isActive])

  return (
    <div ref={sunRef} className={`${styles.smiley} ${className ?? ''}`} style={{ width: size }} aria-hidden="true">
      <img className={styles.sun} src="/brand/cl-sun.svg" alt="" draggable={false} />
      <svg
        ref={faceRef}
        className={styles.face}
        style={{ left: toPercent(centeredFace.left), top: toPercent(centeredFace.top) }}
        viewBox="0 0 88 30"
        fill="none"
      >
        <g className={styles.eyes}>
          <circle cx="28" cy="5" r="5" fill="black" />
          <circle cx="59" cy="5" r="5" fill="black" />
        </g>
        <path d="M2 19C15.8333 25.6667 52 35 86 19" stroke="black" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}
