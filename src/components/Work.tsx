import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { MaskReveal, Reveal } from './ui'

// TODO: replace with real case studies and images (sample projects for layout only).
const projects = [
  { name: 'Masala Lane', tags: ['Branding', 'Social Media'], tint: 'bg-coral', seed: 'eih-masala-lane-food-brand', ratio: 'aspect-[4/5]', h: 1125 },
  { name: 'Rove Footwear', tags: ['Website', 'Growth'], tint: 'bg-cornflower', seed: 'eih-rove-sneaker-store', ratio: 'aspect-[4/3]', h: 675 },
  { name: 'Bloomwell Clinics', tags: ['Branding', 'Website'], tint: 'bg-butter', seed: 'eih-bloomwell-clinic', ratio: 'aspect-square', h: 900 },
  { name: 'Kettle & Crumb', tags: ['Reels', 'Social Media'], tint: 'bg-butter', seed: 'eih-kettle-crumb-cafe', ratio: 'aspect-[4/3]', h: 675 },
  { name: 'UrbanNest Realty', tags: ['Digital Marketing'], tint: 'bg-coral', seed: 'eih-urbannest-city-homes', ratio: 'aspect-[4/5]', h: 1125 },
  { name: 'Pulse Run Club', tags: ['Branding', 'Reels'], tint: 'bg-cornflower', seed: 'eih-pulse-run-club', ratio: 'aspect-square', h: 900 },
]

const tagColor: Record<string, string> = {
  Branding: 'bg-coral',
  Website: 'bg-cornflower',
  'Social Media': 'bg-butter',
  Reels: 'bg-butter',
  Growth: 'bg-cornflower',
  'Digital Marketing': 'bg-coral',
}

/** Image drifts inside its frame as the card scrolls through the viewport. */
function ParallaxImage({ src, alt, h }: { src: string; alt: string; h: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-9%', '9%'])
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
        <img
          src={src}
          alt={alt}
          width={900}
          height={h}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
        />
      </motion.div>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-white py-20 sm:py-28">
      <div className="container-eih">
        <MaskReveal>
          <h2 id="work-title" className="text-h2">
            Ideas Into <span className="italic text-coral">Impact.</span>
          </h2>
        </MaskReveal>

        {/* Masonry: 1 col phones, 2 cols tablet+, offset second column on desktop */}
        <div className="mt-12 columns-1 gap-6 sm:mt-16 md:columns-2 lg:gap-8 [&>*]:mb-8 lg:[&>*]:mb-12">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08} className={`break-inside-avoid ${i === 3 ? 'md:mt-24' : ''}`}>
              <a href="#contact" className="group block" aria-label={`${p.name}: ${p.tags.join(', ')} project. Start a similar project`}>
                <div className={`relative overflow-hidden rounded-[28px] border-2 border-ink bg-butter-50 ${p.ratio}`}>
                  <ParallaxImage src={`https://picsum.photos/seed/${p.seed}/900/${p.h}?grayscale`} alt={`${p.name} project preview`} h={p.h} />
                  {/* Brand-color duotone keeps placeholder photos on-palette; lifts on hover */}
                  <div aria-hidden className={`absolute inset-0 mix-blend-multiply transition-opacity duration-700 ease-out-expo [@media(hover:hover)]:group-hover:opacity-40 ${p.tint}`} />
                  <span className="absolute right-4 top-4 grid size-14 place-items-center rounded-full border-2 border-ink bg-white transition-transform duration-500 ease-out-expo [@media(hover:hover)]:scale-0 [@media(hover:hover)]:group-hover:scale-100 group-hover:rotate-45">
                    <ArrowUpRight weight="bold" className="size-6" aria-hidden />
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-h3 transition-colors group-hover:text-coral">{p.name}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className={`rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold ${tagColor[t]}`}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
