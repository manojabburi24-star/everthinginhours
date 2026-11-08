import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'

const words = ['Branding', 'Websites', 'Social Media', 'Reels', 'Digital Marketing', 'Growth']

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/**
 * The page's single marquee (Framer Motion): drifts on its own, speeds up with scroll velocity
 * and flips direction when you scroll back up.
 */
export function Marquee({ baseVelocity = -2.5 }: { baseVelocity?: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="flex items-center gap-6 px-6 sm:gap-8 sm:px-8">
          <span className="whitespace-nowrap font-display text-2xl font-extrabold italic tracking-tight text-white sm:text-4xl">
            {w}
          </span>
          <img src="/brand/mark.png" alt="" width={40} height={29} className="h-6 w-auto sm:h-8" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="overflow-hidden pb-2 pt-10 sm:pt-12">
      <div className="-mx-4 -rotate-2 border-y-2 border-ink bg-ink py-4 sm:py-5">
        <motion.div style={{ x }} className="flex w-max">
          {row(false)}
          {row(true)}
        </motion.div>
      </div>
    </div>
  )
}
