import { Browser, ChartLineUp, FilmSlate, PenNib, StackSimple, type Icon } from '@phosphor-icons/react'
import { MaskReveal, Reveal, StickerCard } from './ui'

type Service = {
  title: string
  desc: string
  icon: Icon
  surface: string
  tile: string
  span: string
  shadow?: string
  wide?: boolean
}

const services: Service[] = [
  {
    title: 'Branding & Visual Identity',
    desc: 'Logos, colour systems and brand guidelines that make your business instantly recognisable.',
    icon: PenNib,
    surface: 'bg-coral text-ink',
    tile: 'bg-butter',
    span: 'md:row-span-2 lg:col-span-5 lg:row-span-2',
  },
  {
    title: 'Website Design & Development',
    desc: 'Fast, mobile-first websites that look sharp and turn visitors into enquiries.',
    icon: Browser,
    surface: 'bg-cornflower text-ink',
    tile: 'bg-white',
    span: 'lg:col-span-7',
  },
  {
    title: 'Social Media Management',
    desc: 'Planned calendars, on-brand posts and community care, every single week.',
    icon: StackSimple,
    surface: 'bg-butter text-ink',
    tile: 'bg-coral',
    span: 'lg:col-span-3',
  },
  {
    title: 'Creative Content & Reels',
    desc: 'Scroll-stopping reels, shoots and edits made for how people actually watch.',
    icon: FilmSlate,
    surface: 'bg-ink text-white',
    tile: 'bg-cornflower',
    span: 'lg:col-span-4',
    shadow: 'bg-coral',
  },
  {
    title: 'Digital Marketing & Growth',
    desc: 'Ads, SEO and clear reporting focused on leads and sales, not vanity numbers.',
    icon: ChartLineUp,
    surface: 'bg-white text-ink',
    tile: 'bg-butter',
    span: 'md:col-span-2 lg:col-span-12',
    wide: true,
  },
]

/** "3D-inspired" icon: chunky tilted tile with a hard shadow that flips its tilt on hover. */
function IconTile({ icon: I, tile, big }: { icon: Icon; tile: string; big?: boolean }) {
  return (
    <div className="relative w-fit">
      <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-ink" />
      <div
        className={`relative grid place-items-center rounded-2xl border-2 border-ink ${tile} ${
          big ? 'size-20 sm:size-24' : 'size-16 sm:size-[72px]'
        } -rotate-6 transition-transform duration-500 ease-out-expo group-hover:rotate-6 group-hover:scale-105`}
      >
        <I weight="duotone" className={`text-ink ${big ? 'size-11 sm:size-12' : 'size-8 sm:size-9'}`} aria-hidden />
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="container-eih">
        <MaskReveal>
          <h2 id="services-title" className="text-h2 max-w-[14ch]">
            Everything Your Brand <span className="text-coral">Needs.</span>
          </h2>
        </MaskReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          {services.map((s, i) => {
            const big = i === 0
            const Watermark = s.icon
            return (
              <Reveal key={s.title} delay={i * 0.06} className={s.span}>
                <StickerCard className={s.surface} shadowClass={s.shadow}>
                  <article
                    className={`relative flex h-full gap-6 p-6 sm:p-8 ${
                      s.wide ? 'flex-col md:flex-row md:items-center md:justify-between' : 'flex-col justify-between'
                    } ${big ? 'min-h-[340px] lg:min-h-[520px]' : 'min-h-[260px]'}`}
                  >
                    <Watermark
                      aria-hidden
                      weight="fill"
                      className={`pointer-events-none absolute -bottom-8 -right-8 opacity-[0.08] transition-transform duration-700 ease-out-expo group-hover:-rotate-12 ${
                        big ? 'size-72' : 'size-44'
                      }`}
                    />
                    <IconTile icon={s.icon} tile={s.tile} big={big} />
                    <div className={`relative ${s.wide ? 'md:max-w-[60%] md:order-first' : ''}`}>
                      <h3 className={`${big ? 'text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-tight' : 'text-h3'}`}>
                        {s.title}
                      </h3>
                      <p className={`mt-3 max-w-[40ch] leading-relaxed ${s.surface.includes('text-white') ? 'text-white/80' : 'text-ink/80'}`}>
                        {s.desc}
                      </p>
                    </div>
                  </article>
                </StickerCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
