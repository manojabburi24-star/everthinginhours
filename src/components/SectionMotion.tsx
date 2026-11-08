import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Scroll-linked section entrance (Framer Motion): as a section scrolls into view it opens up from an
 * inset rounded card to full width. Only clip-path animates, so the layout never moves or jumps,
 * and content inside keeps its own Reveal / MaskReveal animations.
 */
export function SectionMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] })
  const clipPath = useTransform(scrollYProgress, (p) => {
    const k = 1 - p
    return `inset(0% ${(6 * k).toFixed(2)}% 0% ${(6 * k).toFixed(2)}% round ${(48 * k).toFixed(1)}px)`
  })

  return (
    <motion.div ref={ref} style={reduce ? undefined : { clipPath }}>
      {children}
    </motion.div>
  )
}
