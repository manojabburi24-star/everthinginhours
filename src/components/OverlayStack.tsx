import { Children, Fragment, createRef, useLayoutEffect, useMemo, type ReactNode, type RefObject } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Overlay section stack (Framer Motion).
 *
 * Every section is `position: sticky`. Short sections stick at the top; tall ones stick once their
 * bottom reaches the bottom of the viewport (negative `top`), so all their content is still readable.
 * The next section then slides up OVER it while the covered one scales back and dims.
 *
 * Used once on the page: the hero is the only stuck layer, and the rest of the page slides over it.
 * Anchor ids live on zero-height markers in normal flow, so links land correctly even while stuck.
 */

type LayerProps = {
  index: number
  last: boolean
  selfRef: RefObject<HTMLDivElement | null>
  nextMarker?: RefObject<HTMLDivElement | null>
  rounded: boolean
  children: ReactNode
}

function useStickyTop(ref: RefObject<HTMLDivElement | null>) {
  const top = useMotionValue(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => top.set(Math.min(0, window.innerHeight - el.offsetHeight))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [ref, top])
  return top
}

/** Page Y of the marker, re-measured whenever anything on the page changes size (fonts, images...). */
function useMarkerTop(ref?: RefObject<HTMLDivElement | null>) {
  const top = useMotionValue(Infinity)
  const vh = useMotionValue(typeof window === 'undefined' ? 800 : window.innerHeight)
  useLayoutEffect(() => {
    const update = () => {
      vh.set(window.innerHeight)
      const el = ref?.current
      top.set(el ? el.getBoundingClientRect().top + window.scrollY : Infinity)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    window.addEventListener('resize', update)
    window.addEventListener('load', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('load', update)
    }
  }, [ref, top, vh])
  return { top, vh }
}

function Layer({ index, last, selfRef, nextMarker, rounded, children }: LayerProps) {
  const reduce = useReducedMotion()
  const top = useStickyTop(selfRef)
  const { scrollY } = useScroll()
  const marker = useMarkerTop(nextMarker)
  // 0 when the next section starts entering from the bottom, 1 when it has fully covered this one.
  const scrollYProgress = useTransform(() => {
    const start = marker.top.get() - marker.vh.get()
    return Math.min(1, Math.max(0, (scrollY.get() - start) / marker.vh.get()))
  })
  const covered = last || reduce ? 0 : 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - 0.08 * covered])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5 * covered])
  const radius = useTransform(scrollYProgress, [0, 1], [rounded ? 40 : 0, rounded || covered ? 40 : 0])

  return (
    <motion.div
      ref={selfRef}
      style={{
        top: last ? undefined : top,
        zIndex: index + 1,
        scale,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        transformOrigin: '50% 100%',
      }}
      className={`${last ? 'relative' : 'sticky'} overflow-clip ${
        rounded ? 'shadow-[0_-30px_60px_-30px_rgb(26_26_26/0.35)]' : ''
      }`}
    >
      {children}
      {!last && (
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-20 bg-ink" />
      )}
    </motion.div>
  )
}

/** `anchors[i]` is an optional in-page link id for the i-th layer (e.g. "top" for #top). */
export function OverlayStack({ anchors = [], children }: { anchors?: (string | undefined)[]; children: ReactNode }) {
  const items = Children.toArray(children)
  const count = items.length
  const markers = useMemo(() => Array.from({ length: count }, () => createRef<HTMLDivElement>()), [count])
  const layers = useMemo(() => Array.from({ length: count }, () => createRef<HTMLDivElement>()), [count])

  return (
    <>
      {items.map((child, i) => (
        <Fragment key={anchors[i] ?? i}>
          <div ref={markers[i]} id={anchors[i]} aria-hidden className="h-0" />
          <Layer
            index={i}
            last={i === items.length - 1}
            selfRef={layers[i]}
            nextMarker={markers[i + 1]}
            rounded={i > 0}
          >
            {child}
          </Layer>
        </Fragment>
      ))}
    </>
  )
}
