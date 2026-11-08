import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode, AnchorHTMLAttributes, PointerEvent } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fades + lifts children in when they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Headline reveal: text slides up from behind a mask. The in-view trigger sits on the (visible) mask,
 * not the hidden text, otherwise the browser never reports it as on-screen.
 * Extra bottom room keeps descenders (g, y, p) unclipped.
 */
export function MaskReveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
      className={`-mb-[0.15em] overflow-hidden pb-[0.15em] ${className}`}
    >
      <motion.div
        variants={{ hidden: { y: '110%', rotate: 2 }, shown: { y: 0, rotate: 0 } }}
        transition={{ duration: 0.9, delay, ease: EASE }}
        className="origin-bottom-left"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

type Variant = 'coral' | 'white' | 'ink'

const variants: Record<Variant, string> = {
  // Charcoal text on Coral = 4.8:1 contrast (passes WCAG AA at any size)
  coral: 'bg-coral text-ink',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-white',
}

/**
 * Sticker-style pill button with a magnetic pull toward the cursor (mouse/trackpad only).
 * The hard shadow is a separate layer so the hover effect only animates transform.
 */
export function PillButton({
  children,
  variant = 'coral',
  icon = true,
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: boolean }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 15, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const { onDrag: _d, onDragStart: _ds, onDragEnd: _de, onAnimationStart: _as, ...rest } = props
  return (
    <motion.a
      {...rest}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group/btn relative inline-flex shrink-0 ${className}`}
    >
      <span aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-ink" />
      <span
        className={`relative inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink px-6 py-3 font-display text-base font-bold transition-transform duration-300 ease-out-expo group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 group-active/btn:translate-x-1 group-active/btn:translate-y-1 sm:px-7 ${variants[variant]}`}
      >
        {children}
        {icon && (
          <ArrowUpRight
            weight="bold"
            className="size-5 transition-transform duration-300 ease-out-expo group-hover/btn:rotate-45"
            aria-hidden
          />
        )}
      </span>
    </motion.a>
  )
}

/** Card with a hard offset shadow layer; lifts on hover (transform only). */
export function StickerCard({
  children,
  className = '',
  shadowClass = 'bg-ink',
}: {
  children: ReactNode
  className?: string
  shadowClass?: string
}) {
  return (
    <div className="group relative h-full">
      <div aria-hidden className={`absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] ${shadowClass}`} />
      <div
        className={`relative h-full overflow-hidden rounded-[28px] border-2 border-ink transition-transform duration-500 ease-out-expo [@media(hover:hover)]:group-hover:-translate-x-1 [@media(hover:hover)]:group-hover:-translate-y-1 ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
