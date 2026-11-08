import { Fingerprint, Lightbulb, Lightning, TrendUp, UsersThree, type Icon } from '@phosphor-icons/react'
import { MaskReveal, Reveal } from './ui'

const reasons: { title: string; desc: string; icon: Icon; color: string; tilt: string }[] = [
  {
    title: 'Fast Creative Execution',
    desc: 'Quick turnarounds without cutting corners, so your ideas go live while they still matter.',
    icon: Lightning,
    color: 'bg-coral',
    tilt: 'lg:-rotate-1',
  },
  {
    title: 'One Team, Multiple Solutions',
    desc: 'Design, web, content and ads under one roof. One brief, one point of contact.',
    icon: UsersThree,
    color: 'bg-cornflower',
    tilt: 'lg:rotate-1 lg:ml-10',
  },
  {
    title: 'Consistent Brand Identity',
    desc: 'Every post, page and ad looks and sounds like you, on every platform.',
    icon: Fingerprint,
    color: 'bg-butter',
    tilt: 'lg:-rotate-[0.5deg]',
  },
  {
    title: 'Creative Strategies',
    desc: 'Ideas built around your audience and your goals, not whatever is trending this week.',
    icon: Lightbulb,
    color: 'bg-coral',
    tilt: 'lg:rotate-1 lg:ml-10',
  },
  {
    title: 'Growth-Focused Approach',
    desc: 'We track leads, reach and sales, then double down on what actually works.',
    icon: TrendUp,
    color: 'bg-cornflower',
    tilt: 'lg:-rotate-1',
  },
]

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative bg-butter py-20 sm:py-28">
      <div className="container-eih relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <MaskReveal>
              <h2 id="why-title" className="text-h2">
                Less <span className="relative inline-block">Managing.<span aria-hidden className="absolute left-0 right-0 top-[55%] h-[0.12em] -rotate-3 rounded-full bg-coral" /></span>
                <br />
                More <span className="text-cornflower">Growing.</span>
              </h2>
            </MaskReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink/80">
                Stop juggling freelancers and five different vendors. Hand us the brief and get back to running your business.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="flex flex-col gap-5 lg:col-span-7">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.05}>
                <div
                  className={`group flex items-start gap-5 rounded-[28px] border-2 border-ink bg-white p-5 shadow-[5px_5px_0_0_var(--color-ink)] transition-transform duration-500 ease-out-expo sm:items-center sm:p-6 [@media(hover:hover)]:hover:rotate-0 ${r.tilt}`}
                >
                  <span className={`grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink ${r.color} transition-transform duration-500 ease-out-expo group-hover:-rotate-12 sm:size-16`}>
                    <r.icon weight="duotone" className="size-7 sm:size-8" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h3">{r.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink/75">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
