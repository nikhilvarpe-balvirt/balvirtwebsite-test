import { useLocation } from 'react-router-dom'
import { Mail, MapPin, Phone, Clock, MessageSquareText, UserCheck, ClipboardList, ShieldCheck, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import { Field, Honeypot, Status, SubmitButton, useSubmit } from '../components/forms'
import { Instagram, Linkedin, Youtube } from '../components/social'
import { PageHero, Reveal, SectionHeading } from '../components/ui'
import { SITE } from '../data/site'
import { emailProps, messageProps, nameProps, phoneProps } from '../lib/rules'

const DETAILS = [
  { icon: Phone, label: 'Call us', value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: 'Email us', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: 'Visit us', value: SITE.address },
  { icon: Clock, label: 'Response time', value: 'Within 24 hours' },
]
const SOCIAL = [[Linkedin, SITE.social.linkedin, 'LinkedIn'], [Youtube, SITE.social.youtube, 'YouTube'], [Instagram, SITE.social.instagram, 'Instagram']]
const STEPS = [
  { icon: MessageSquareText, t: 'You send a message', d: 'Tell us about your goals, systems and timeline.' },
  { icon: UserCheck, t: 'We reach out', d: 'An experienced consultant replies within 24 hours.' },
  { icon: ClipboardList, t: 'You get a clear plan', d: 'We map the right solution for your industry and budget.' },
]
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent('Hirai Estate, Adarsh Nagar, Ghulewadi, Maharashtra 422605')}&output=embed`

export default function Contact() {
  const { state, submit } = useSubmit('contact.php')
  const topic = new URLSearchParams(useLocation().search).get('topic') === 'institute' ? 'institute' : ''
  return (
    <>
      <Seo
        path="/contact"
        title="Contact Balvirt | Book a Free Consultation"
        description="Book a free consultation with Balvirt for AI, software, automation or NetSuite ERP. Call +91 9665521708 or email contact@balvirt.com."
      />
      <PageHero eyebrow="Contact us" title="Let's talk about your" highlight="Requirements" subtitle="Book a free consultation. Share a few details and an experienced consultant will get back to you within 24 hours." />

      <section className="px-5 pb-16 sm:pb-20">
        <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[rgba(40,36,110,.10)] bg-[#fff] shadow-2xl shadow-violet/15 lg:grid-cols-[0.9fr_1.2fr]">
          {/* Brand panel */}
          <div className="relative overflow-hidden bg-gradient-to-br from-violet via-[#5b4bf0] to-blue-600 p-8 text-on-brand sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[rgba(255,255,255,.14)] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[rgba(255,255,255,.10)] blur-2xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold sm:text-3xl">Contact information</h2>
              <p className="mt-2 text-[rgba(255,255,255,.82)]">Prefer to talk directly? Reach us any way that suits you.</p>
              <ul className="mt-8 space-y-5">
                {DETAILS.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,.18)]"><d.icon size={20} /></span>
                    <div className="min-w-0">
                      <div className="text-xs font-medium uppercase tracking-wider text-[rgba(255,255,255,.7)]">{d.label}</div>
                      {d.href ? <a href={d.href} className="break-words font-medium underline-offset-4 hover:underline">{d.value}</a> : <div className="font-medium">{d.value}</div>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-t border-[rgba(255,255,255,.2)] pt-6">
                <div className="text-xs font-medium uppercase tracking-wider text-[rgba(255,255,255,.7)]">Follow us</div>
                <div className="mt-3 flex gap-3">
                  {SOCIAL.map(([I, href, label]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,255,255,.18)] transition hover:-translate-y-1 hover:bg-[#fff] hover:text-violet"><I /></a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Send us a <span className="text-gradient">message</span></h2>
            <p className="mt-2 text-muted">Fields marked * are required.</p>
            {topic && <p className="mt-4 rounded-xl border border-violet/20 bg-violet/5 px-4 py-3 text-sm text-violet">You are enquiring about <strong>Balvirttechhub</strong>, our training and career institute.</p>}
            <form onSubmit={submit} className="relative mt-7 space-y-4">
              <Honeypot />
              {topic && <input type="hidden" name="topic" value={topic} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" id="name" required autoComplete="name" placeholder="Jane Doe" {...nameProps} />
                <Field label="Email" id="email" type="email" required autoComplete="email" placeholder="you@company.com" {...emailProps} />
              </div>
              <Field label="Phone" id="phone" type="tel" required autoComplete="tel" placeholder="+91 98765 43210" {...phoneProps} />
              <Field label="How can we help?" id="message" as="textarea" rows={5} required {...messageProps} placeholder="Tell us about your project, current systems and goals…" />
              <Status state={state} />
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="flex items-center gap-2 text-xs text-muted"><ShieldCheck size={15} className="text-violet" /> Your details are never shared.</p>
                <SubmitButton busy={state.busy}>{state.busy ? 'Sending…' : 'Send message'}</SubmitButton>
              </div>
            </form>
          </div>
        </Reveal>
      </section>

      <section className="px-5 pb-16 sm:pb-20">
        <SectionHeading eyebrow="What happens next" title="From message to" highlight="a clear plan" />
        <div className="relative mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1}>
              <div className="glass relative h-full rounded-3xl p-7 text-center transition hover:-translate-y-2">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><s.icon size={24} /></span>
                <span className="absolute right-5 top-4 font-display text-4xl font-extrabold text-white/[0.07]">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-24">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[rgba(40,36,110,.10)] bg-[#fff] p-2 shadow-xl shadow-violet/10">
          <iframe title="Balvirt office location map" loading="lazy" className="h-72 w-full rounded-[1.6rem] sm:h-96" src={MAP_SRC} />
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full bg-[#fff] px-4 py-2.5 text-sm font-semibold text-violet shadow-lg transition hover:-translate-y-0.5">
            <MapPin size={16} /> Open in Google Maps <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </section>
    </>
  )
}
