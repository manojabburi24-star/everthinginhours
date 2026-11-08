import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import {
  Camera,
  ChatCircleDots,
  Heart,
  Lightning,
  PenNib,
  Play,
  TrendUp,
  type Icon,
} from '@phosphor-icons/react'

/**
 * Framer Motion hero visual:
 * - the supplied brand mark tilts in 3D toward the pointer (CSS perspective)
 * - sticker tiles float, parallax by depth, and can be dragged around (mouse/trackpad)
 * - on scroll, the composition rotates and drifts as the next section covers the hero
 */

type Tile = { icon: Icon; bg: string; left: string; top: string; depth: number; rot: number; size: 'sm' | 'md' | 'lg'; delay: number }

const tiles: Tile[] = [
  { icon: Heart, bg: 'bg-coral', left: '6%', top: '14%', depth: 1.2, rot: -12, size: 'md', delay: 0.5 },
  { icon: Lightning, bg: 'bg-cornflower', left: '80%', top: '6%', depth: 1.6, rot: 10, size: 'lg', delay: 0.6 },
  { icon: Play, bg: 'bg-butter', left: '86%', top: '58%', depth: 1, rot: 8, size: 'md', delay: 0.7 },
  { icon: Camera, bg: 'bg-white', left: '2%', top: '62%', depth: 1.4, rot: -8, size: 'lg', delay: 0.8 },
  { icon: ChatCircleDots, bg: 'bg-butter', left: '22%', top: '84%', depth: 0.8, rot: 6, size: 'sm', delay: 0.9 },
  { icon: PenNib, bg: 'bg-white', left: '58%', top: '-2%', depth: 0.7, rot: -6, size: 'sm', delay: 1 },
  { icon: TrendUp, bg: 'bg-coral', left: '64%', top: '86%', depth: 1.1, rot: -10, size: 'sm', delay: 1.1 },
]

const sizes = {
  sm: 'size-12 sm:size-14 rounded-2xl [&_svg]:size-6 sm:[&_svg]:size-7',
  md: 'size-14 sm:size-[72px] rounded-[20px] [&_svg]:size-7 sm:[&_svg]:size-9',
  lg: 'size-16 sm:size-20 rounded-3xl [&_svg]:size-8 sm:[&_svg]:size-10',
}

function StickerTile({
  tile,
  px,
  py,
  canDrag,
  reduce,
  bounds,
}: {
  tile: Tile
  px: MotionValue<number>
  py: MotionValue<number>
  canDrag: boolean
  reduce: boolean
  bounds: React.RefObject<HTMLDivElement | null>
}) {
  const x = useTransform(px, (v) => v * 26 * tile.depth)
  const y = useTransform(py, (v) => v * 20 * tile.depth)
  const I = tile.icon
  return (
    <motion.div className="absolute" style={{ left: tile.left, top: tile.top, x, y }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: tile.rot * 3 }}
        animate={{ opacity: 1, scale: 1, rotate: tile.rot }}
        transition={{ type: 'spring', stiffness: 160, damping: 14, delay: tile.delay }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 4 + tile.depth * 1.5, repeat: Infinity, ease: 'easeInOut', delay: tile.delay }}
        >
          <motion.div
            drag={canDrag}
            dragConstraints={bounds}
            dragElastic={0.35}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
            whileHover={canDrag ? { scale: 1.12, rotate: -6 } : undefined}
            whileDrag={{ scale: 1.2, rotate: 10, cursor: 'grabbing' }}
            className={`relative grid place-items-center border-2 border-ink shadow-[4px_4px_0_0_var(--color-ink)] ${tile.bg} ${sizes[tile.size]} ${canDrag ? 'cursor-grab' : ''}`}
          >
            <I weight="duotone" className="text-ink" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function HeroVisual() {
  const reduce = !!useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [canDrag, setCanDrag] = useState(false)

  // Pointer position over the window, -1..1, smoothed with springs (no React re-renders).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 90, damping: 18 })
  const py = useSpring(my, { stiffness: 90, damping: 18 })
  const rotateY = useTransform(px, [-1, 1], [-18, 18])
  const rotateX = useTransform(py, [-1, 1], [14, -14])

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setCanDrag(fine && !reduce)
    if (!fine || reduce) return
    const onMove = (e: globalThis.PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my, reduce])

  // Scroll: as the hero is covered, the mark spins away and the whole composition drifts up.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const spin = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -35])
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-18%'])
  const grow = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15])

  return (
    <motion.div ref={ref} style={{ y: drift }} className="relative size-full [perspective:1200px]">
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 aspect-square w-[70%] max-w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/25"
      />

      {/* 3D-tilting brand mark */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.div style={{ rotateX, rotateY, rotate: spin, scale: grow }} className="w-[52%] max-w-[360px] [transform-style:preserve-3d]">
          <motion.img
            src="/brand/mark.png"
            alt=""
            width={512}
            height={368}
            initial={reduce ? false : { scale: 0.3, opacity: 0, rotate: -40 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.25 }}
            className="w-full select-none drop-shadow-[0_30px_30px_rgb(26_26_26/0.25)] [transform:translateZ(60px)]"
            draggable={false}
          />
        </motion.div>
      </div>

      {tiles.map((t) => (
        <StickerTile key={t.left + t.top} tile={t} px={px} py={py} canDrag={canDrag} reduce={reduce} bounds={ref} />
      ))}
    </motion.div>
  )
}
