import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { MaskReveal, Reveal } from './ui'

const steps = [
  { n: '01', title: 'Discover', desc: 'We learn your business, audience and competitors before designing a single thing.', color: 'bg-butter' },
  { n: '02', title: 'Strategize', desc: 'A clear plan for your brand, channels and content, with goals we can measure.', color: 'bg-cornflower' },
  { n: '03', title: 'Design', desc: 'Identity, website and content created to look sharp and feel unmistakably you.', color: 'bg-coral' },
  { n: '04', title: 'Launch', desc: 'We go live across web and social, tested and polished on every screen.', color: 'bg-cornflower' },
  { n: '05', title: 'Grow', desc: 'Monthly content, ads and reports that keep your brand moving forward.', color: 'bg-coral' },
]

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <section id="process" aria-labelledby="process-title" className="bg-butter-50 py-20 sm:py-28">
      <div className="container-eih">
        <MaskReveal>
          <h2 id="process-title" className="text-h2 max-w-[16ch]">
            From Business To <span className="text-coral">Brand.</span>
          </h2>
        </MaskReveal>

        <ol ref={ref} className="relative mt-14 grid grid-cols-1 gap-10 sm:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* Track + scroll-linked fill. Vertical on phones/tablets, horizontal on desktop. */}
          <div aria-hidden className="absolute bottom-8 left-[31px] top-8 w-1 rounded-full bg-ink/10 lg:bottom-auto lg:left-8 lg:right-8 lg:top-[31px] lg:h-1 lg:w-auto">
            <motion.div style={{ scaleY: progress }} className="size-full origin-top rounded-full bg-ink lg:hidden" />
            <motion.div style={{ scaleX: progress }} className="hidden size-full origin-left rounded-full bg-ink lg:block" />
          </div>

          {steps.map((s, i) => (
            <li key={s.n} className="relative flex gap-6 lg:flex-col lg:gap-8">
              <Reveal delay={i * 0.08} className="shrink-0">
                <span
                  className={`relative grid size-16 place-items-center rounded-full border-2 border-ink font-display text-xl font-extrabold shadow-[4px_4px_0_0_var(--color-ink)] ${s.color}`}
                >
                  {s.n}
                </span>
              </Reveal>
              <Reveal delay={i * 0.08 + 0.05} className="pt-2 lg:pt-0">
                <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-extrabold leading-none tracking-tight">{s.title}</h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-ink/75">{s.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
