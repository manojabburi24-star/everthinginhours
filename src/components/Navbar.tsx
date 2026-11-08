import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { List, X } from '@phosphor-icons/react'
import { navLinks } from '../site'
import { PillButton } from './ui'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  // Solid bar after the first few pixels; hide while scrolling down, show again on any scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    if (next !== scrolled) setScrolled(next)
    const prev = scrollY.getPrevious() ?? 0
    const shouldHide = !reduce && y > 400 && y > prev + 4
    const shouldShow = y < prev - 4 || y < 400
    if (shouldHide && !hidden) setHidden(true)
    else if (shouldShow && hidden) setHidden(false)
  })

  // Lock page scroll + close on Esc while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40"
      animate={{ y: hidden && !open ? '-110%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left bg-coral" />
      <div
        className={`transition-colors duration-300 ${
          scrolled || open ? 'border-b-2 border-ink bg-white/85 backdrop-blur-lg' : 'border-b-2 border-transparent'
        }`}
      >
        <nav aria-label="Main" className="container-eih flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <a href="#top" className="shrink-0" aria-label="Everything In Hours, back to top">
            <img src="/brand/logo-light-bg.png" alt="Everything In Hours" width={900} height={254} className="h-10 w-auto lg:h-12" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 font-display text-[0.95rem] font-bold transition-colors hover:bg-butter"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <PillButton href="#contact">Start Your Growth</PillButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-12 place-items-center rounded-full border-2 border-ink bg-butter lg:hidden"
          >
            {open ? <X weight="bold" className="size-6" /> : <List weight="bold" className="size-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-butter lg:hidden"
          >
            <ul className="container-eih flex flex-col gap-2 pt-8">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-eih pb-10 pt-8">
              <PillButton href="#contact" onClick={() => setOpen(false)}>
                Start Your Growth
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
