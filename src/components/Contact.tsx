import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle, Phone, WarningCircle, WhatsappLogo } from '@phosphor-icons/react'
import { serviceNames, site, whatsappLink } from '../site'
import { MaskReveal, Reveal } from './ui'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>

const inputCls =
  'w-full rounded-2xl border-2 border-ink bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/55 transition-shadow focus:shadow-[4px_4px_0_0_var(--color-cornflower)] focus:outline-none aria-[invalid=true]:border-coral'

export function Contact() {
  const [picked, setPicked] = useState<string[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))

  // Validates, then opens WhatsApp chat with +91 90635 02404 with the whole enquiry pre-filled.
  // The visitor taps Send in WhatsApp and it lands directly on the business number.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    const next: Errors = {}
    if (!name) next.name = 'Tell us your name.'
    if (phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a phone number with at least 10 digits.'
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'That email does not look right.'
    if (message.length < 10) next.message = 'A line or two about your business helps us prepare.'
    setErrors(next)
    if (Object.keys(next).length) return

    const lines: (string | false)[] = [
      '*New enquiry from the Everything In Hours website*',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      !!email && `*Email:* ${email}`,
      `*Interested in:* ${picked.join(', ') || 'Not sure yet'}`,
      '',
      '*About the business:*',
      message,
    ]
    const text = lines.filter((l) => l !== false).join('\n')
    const url = whatsappLink(text)
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = url // popup blocked: open in the same tab
    setSent(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-16 sm:py-24">
      <div className="container-eih">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-5 py-12 text-white sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <img src="/brand/mark.png" alt="" width={512} height={368} className="pointer-events-none absolute -bottom-16 -left-16 w-64 -rotate-12 opacity-90 sm:w-80 lg:-bottom-20 lg:w-[420px]" />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <MaskReveal>
                <h2 id="contact-title" className="text-h2">
                  Your Business Deserves To Be A <span className="text-coral">Brand.</span>
                </h2>
              </MaskReveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/80">
                  Let&apos;s build something people recognize, remember, and trust.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={whatsappLink('Hi Everything In Hours, I would like to grow my brand.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full border-2 border-white/25 px-5 py-2.5 font-semibold transition-colors hover:border-butter hover:text-butter"
                  >
                    <WhatsappLogo weight="duotone" className="size-6" aria-hidden />
                    WhatsApp {site.phone}
                  </a>
                  <a
                    href={site.phoneHref}
                    className="inline-flex min-h-12 w-fit items-center gap-3 rounded-full border-2 border-white/25 px-5 py-2.5 font-semibold transition-colors hover:border-butter hover:text-butter"
                  >
                    <Phone weight="duotone" className="size-6" aria-hidden />
                    Call {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="rounded-[28px] border-2 border-ink bg-butter-50 p-5 text-ink shadow-[8px_8px_0_0_var(--color-coral)] sm:p-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[380px] flex-col items-start justify-center gap-4" role="status">
                      <CheckCircle weight="duotone" className="size-14 text-cornflower" aria-hidden />
                      <h3 className="text-h3">Almost there. Tap send in WhatsApp.</h3>
                      <p className="max-w-[40ch] text-ink/80">
                        WhatsApp has opened with your enquiry filled in for {site.phone}. If it did not open, message or call us
                        directly on{' '}
                        <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>.
                      </p>
                      <button type="button" onClick={() => setSent(false)} className="font-semibold underline underline-offset-4">
                        Edit my message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                      <Field id="name" label="Your name" error={errors.name}>
                        <input id="name" name="name" autoComplete="name" placeholder="Priya Sharma" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputCls} />
                      </Field>
                      <Field id="phone" label="Phone / WhatsApp number" error={errors.phone}>
                        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputCls} />
                      </Field>
                      <Field id="email" label="Email (optional)" error={errors.email}>
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@business.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputCls} />
                      </Field>

                      <fieldset>
                        <legend className="mb-2 text-sm font-semibold">What do you need?</legend>
                        <div className="flex flex-wrap gap-2">
                          {serviceNames.map((s) => {
                            const on = picked.includes(s)
                            return (
                              <button
                                key={s}
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggle(s)}
                                className={`min-h-11 rounded-full border-2 border-ink px-4 py-2 text-sm font-semibold transition-colors ${on ? 'bg-cornflower' : 'bg-white hover:bg-butter'}`}
                              >
                                {s}
                              </button>
                            )
                          })}
                        </div>
                      </fieldset>

                      <Field id="message" label="Tell us about your business" error={errors.message}>
                        <textarea id="message" name="message" rows={4} placeholder="What you do, who you sell to, and what you want to change." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} className={`${inputCls} resize-y`} />
                      </Field>

                      <p className="text-sm text-ink/75">Your enquiry is sent to us on WhatsApp ({site.phone}).</p>
                      <button type="submit" className="group/btn relative -mt-1 inline-flex w-full sm:w-fit">
                        <span aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 rounded-full bg-ink" />
                        <span className="relative inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-ink bg-coral px-7 py-3 font-display font-bold text-ink transition-transform duration-300 ease-out-expo group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 group-active/btn:translate-x-1 group-active/btn:translate-y-1">
                          <WhatsappLogo weight="bold" className="size-5" aria-hidden />
                          Let&apos;s Get Started
                        </span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <WarningCircle weight="fill" className="size-4 shrink-0 text-coral" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
