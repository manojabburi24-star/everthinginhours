import { motion, useReducedMotion } from 'motion/react'
import { PillButton } from './ui'
import { HeroVisual } from './HeroVisual'

const EASE = [0.16, 1, 0.3, 1] as const

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const reduce = !!useReducedMotion()

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-clip bg-butter-50">
      {/* Soft brand-colour glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 -z-10 size-[520px] rounded-full bg-butter blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-20 -z-10 size-[460px] rounded-full bg-cornflower/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/4 -z-10 size-[420px] rounded-full bg-coral/10 blur-3xl" />

      <div className="container-eih relative grid min-h-[100dvh] grid-cols-1 content-center gap-y-6 pb-10 pt-24 lg:grid-cols-12 lg:gap-x-8 lg:pb-12 lg:pt-28">
        {/* Framer Motion visual: under the CTAs on phones, beside the copy (below the headline) on desktop.
            It never sits behind the headline, so the headline stays the strongest element. */}
        <div className="relative order-3 h-[340px] sm:h-[440px] lg:col-span-7 lg:-mt-6 lg:h-[clamp(360px,46dvh,500px)]">
          <HeroVisual />
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 order-1 inline-flex w-fit -rotate-2 items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] shadow-[3px_3px_0_0_var(--color-ink)] sm:text-sm lg:col-span-12"
        >
          <img src="/brand/mark.png" alt="" width={22} height={16} className="h-4 w-auto" />
          Your Digital Growth Partner
        </motion.p>

        <h1 id="hero-title" className="text-display relative z-10 order-2 font-extrabold lg:col-span-12">
          <Line delay={0.1}>
            Business To{' '}
            <span className="relative inline-block text-coral">
              Brand.
            </span>
          </Line>
          <Line delay={0.22}>
            Everything In{' '}
            <span className="relative inline-block text-cornflower">
              Hours.
              {/* Brand-board swoosh under HOURS */}
              <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-[96%] text-butter [filter:drop-shadow(0_1px_0_var(--color-ink))]">
                <motion.path
                  d="M4 18 C 80 6, 200 4, 296 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                />
              </svg>
            </span>
          </Line>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="relative z-10 order-2 flex flex-col gap-7 lg:col-span-5 lg:self-center"
        >
          <p className="max-w-[52ch] text-base leading-relaxed text-ink/80 sm:text-lg">
            We turn ambitious businesses into memorable brands through creative design, powerful websites, and digital
            marketing that moves your business forward.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <PillButton href="#contact">Start Your Growth</PillButton>
            <PillButton href="#work" variant="white">
              Explore Our Work
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
