import { ArrowUp, EnvelopeSimple, InstagramLogo, LinkedinLogo, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { site, whatsappLink } from '../site'

const explore = [
  { href: '#why-us', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

const social = [
  { href: whatsappLink(), label: `WhatsApp ${site.phone}`, icon: WhatsappLogo, external: true },
  { href: site.phoneHref, label: `Call ${site.phone}`, icon: Phone, external: false },
  { href: site.instagram, label: 'Instagram', icon: InstagramLogo, external: true },
  { href: site.linkedin, label: 'LinkedIn', icon: LinkedinLogo, external: true },
  { href: `mailto:${site.email}`, label: 'Email', icon: EnvelopeSimple, external: false },
]

export function Footer() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="container-eih grid grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <img src="/brand/logo-dark-bg.png" alt="Everything In Hours" width={900} height={211} loading="lazy" className="h-14 w-auto sm:h-16" />
          <p className="mt-6 max-w-[38ch] leading-relaxed text-white/75">
            A digital marketing and creative agency turning ambitious businesses into brands people remember.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-butter">Explore</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-block py-1.5 text-lg font-medium transition-colors hover:text-coral">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-butter">Connect</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-3 py-1.5 text-lg font-medium transition-colors hover:text-cornflower"
                >
                  <s.icon weight="duotone" className="size-6" aria-hidden />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-eih flex flex-col items-start justify-between gap-4 py-6 text-sm text-white/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Everything In Hours. Business To Brand.</p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:text-butter">
            Back to top <ArrowUp weight="bold" className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
