import { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Quote, Zap, Wrench, Headset, Target, Eye, HeartHandshake, Users, Lightbulb, Award, GraduationCap, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import PhotoViewer from '../components/PhotoViewer'
import { BulletList, Counter, CTA, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui'

import { SITE, YEARS } from '../data/site'
import { JOURNEY, JOURNEY_CLOSING, LEADERS } from '../data/about'
const OFFER = [
  'AI integrations and automated workflows that remove manual work and save hours every week',
  'Custom websites, software and AI models built around your process',
  'Oracle NetSuite implementation, customization, integration and 24/7 support',
  'Technology consulting and business advisory, plus our own products (Balsuite, Balfrevo and Layvora) and Balvirttechhub, our training and career institute',
]
const PILLARS = [
  { icon: Zap, t: 'Fast implementation', d: 'Quick, efficient deployment of NetSuite solutions tailored to your business needs.' },
  { icon: Wrench, t: 'Custom solutions', d: 'ERP solutions that fit your unique business processes and requirements.' },
  { icon: Headset, t: '24/7 support', d: 'Round-the-clock technical support to keep your systems running smoothly.' },
]
const MISSION = [
  'Simplify complex business processes through technology-driven automation.',
  'Provide actionable insights via real-time analytics and seamless integrations.',
  'Help organizations become cloud-ready, data-ready and AI-ready.',
  'Foster long-term client success with solutions tailored to unique business needs.',
  'Build a culture of continuous learning, innovation and excellence within our team.',
]
const VISION = [
  'Simplify complexity and empower smarter decision-making.',
  'Enhance productivity and operational efficiency across industries.',
  'Deliver seamless, integrated experiences across cloud, mobile and web platforms.',
  'Set industry benchmarks for innovation, reliability and client satisfaction.',
  'Create sustainable impact by driving growth, agility and competitiveness for our clients.',
]
const VALUES = [
  { icon: ShieldCheck, t: 'Integrity', d: 'We act with honesty and accountability.' },
  { icon: HeartHandshake, t: 'Customer focus', d: 'We put clients at the center of everything.' },
  { icon: Lightbulb, t: 'Innovation', d: 'We embrace change and deliver smart solutions.' },
  { icon: Award, t: 'Excellence', d: 'We strive for quality in every detail.' },
  { icon: Users, t: 'Teamwork', d: 'Collaboration and mutual respect.' },
  { icon: GraduationCap, t: 'Learning', d: 'Continuous improvement and curiosity.' },
  { icon: Target, t: 'Responsibility', d: 'Positive impact through ownership.' },
]

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
}

function Leaders() {
  return (
    <section id="leadership" className="scroll-mt-28 px-5 py-12 sm:py-16">
      <SectionHeading eyebrow="Meet the leaders" title="Leadership you" highlight="can trust" subtitle="Meet the leaders shaping Balvirt's future through innovation, integrity, and a commitment to delivering lasting value for our clients and people." />

      <div className="mx-auto mt-12 max-w-5xl space-y-10 sm:space-y-12">
            {LEADERS.map((l, i) => (
              <Reveal key={l.role} y={36} delay={i * 0.1} >
              <div className={`grid items-center gap-8 md:gap-14 ${i % 2 ? 'md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]' : 'md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]'}`}>
                {/* image side */}
                <div className={i % 2 ? 'md:order-2' : ''}>
                  <div className={`relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-gradient-to-br from-[#a78bfa] via-[#6d4aff] to-[#3b82f6] ring-1 ring-[rgba(40,36,110,.14)] md:max-w-sm ${l.featured ? 'shadow-2xl shadow-violet/40 ring-2 ring-violet/40' : 'shadow-lg shadow-violet/25'}`}>
                    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[rgba(255,255,255,.22)] blur-2xl" aria-hidden="true" />
                    {l.photo ? (
                      <img src={l.photo} alt={`${l.name}, ${l.role} of Balvirt`} loading="lazy" className={l.photo.endsWith('.svg') ? 'absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-none object-contain object-bottom' : 'absolute inset-0 h-full w-full object-cover object-top contrast-[1.04] saturate-[1.03]'} />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold text-on-brand">{initials(l.name)}</span>
                    )}
                  </div>
                </div>

                {/* description side */}
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <span className="inline-block rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet">{l.role}</span>
                  <h3 className={`mt-4 font-display font-bold ${l.featured ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>{l.name}</h3>
                  {l.tagline && <p className="mt-2 font-display text-lg font-semibold text-gradient">{l.tagline}</p>}
                  <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-violet to-blue-500" />
                  <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{l.bio}</p>
                  {l.quote && (
                    <figure className="relative mt-6 rounded-2xl border-l-4 border-violet bg-violet/[0.06] py-4 pl-6 pr-12">
                      <Quote size={18} className="absolute right-4 top-4 text-violet/40" aria-hidden="true" />
                      <blockquote className="font-display text-base font-medium leading-relaxed text-ink sm:text-lg">“{l.quote}”</blockquote>
                      <figcaption className="mt-2 text-sm font-semibold text-violet">{l.name}, {l.role.split('|')[0].trim()}</figcaption>
                    </figure>
                  )}
                  {l.linkedin && <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-semibold text-violet hover:underline">LinkedIn →</a>}
                </div>
              </div>
            </Reveal>
            ))}
      </div>
    </section>
  )
}

// Every journey photo in timeline order (for the full-screen viewer). Large copy = <name>-lg.webp next to the card copy.
const JOURNEY_PHOTOS = JOURNEY.flatMap((m) =>
  (m.images || [{ src: m.image, alt: m.alt }, ...(m.extra || [])]).map((x) => ({ year: m.year, sm: x.src, lg: x.src.replace(/.webp$/, '-lg.webp'), alt: x.alt })),
)

/** A journey picture that opens the full-screen viewer when clicked. */
function Zoom({ src, alt, onOpen, className, width, height }) {
  return (
    <button type="button" onClick={() => onOpen(src)} aria-label={`View larger: ${alt}`} className="group relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-violet">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className={`${className} transition-transform duration-500 group-hover:scale-[1.03]`} />
    </button>
  )
}

function JourneyCard({ m, id, onOpen }) {
  const [open, setOpen] = useState(false)
  const hasMore = m.more?.length > 0
  return (
    <div className="glass overflow-hidden rounded-3xl">
      {m.images ? (
        <div className="grid grid-cols-2 gap-1.5 bg-violet/10 p-1.5">
          {m.images.map((x) => <div key={x.src} className="overflow-hidden rounded-xl"><Zoom src={x.src} alt={x.alt} onOpen={onOpen} width="900" height="1200" className="aspect-[3/4] w-full object-cover" /></div>)}
        </div>
      ) : (
        <>
          <Zoom src={m.image} alt={m.alt} onOpen={onOpen} width="900" height="600" className="aspect-[3/2] w-full object-cover" />
          {m.extra?.length > 0 && (
            <div className={`grid gap-1.5 bg-violet/10 p-1.5 ${m.extra.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {m.extra.map((x) => <div key={x.src} className="overflow-hidden rounded-lg"><Zoom src={x.src} alt={x.alt} onOpen={onOpen} width="800" height="600" className="aspect-[4/3] w-full object-cover" /></div>)}
            </div>
          )}
        </>
      )}
      <div className="p-6 text-left">
        <div className="text-gradient font-display text-2xl font-extrabold lg:hidden">{m.year}</div>
        <h3 className="mt-1 text-xl font-semibold leading-snug">{m.title}</h3>
        {m.chips?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {m.chips.map((c) => <span key={c} className="rounded-full bg-violet/10 px-2.5 py-1 text-[11px] font-semibold text-violet">{c}</span>)}
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted">{m.summary}</p>

        {hasMore && (
          <div id={id} className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="space-y-3 pt-3 text-sm leading-relaxed text-muted">
                {m.more.map((p) => <p key={p}>{p}</p>)}
                {m.quote && (
                  <blockquote className="rounded-2xl border-l-4 border-violet bg-violet/[0.06] py-3 pl-4 pr-3 font-display text-[0.95rem] font-medium leading-relaxed text-ink">“{m.quote}”</blockquote>
                )}
              </div>
            </div>
          </div>
        )}

        {hasMore && (
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={id} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:underline">
            {open ? 'Show less' : 'Read more'} <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        )}

        {m.motto && <p className="mt-4 border-t border-[rgba(40,36,110,.10)] pt-3 font-display text-xs font-semibold uppercase tracking-wider text-violet">BALVIRT — {m.motto}</p>}
      </div>
    </div>
  )
}

function Journey() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const [photo, setPhoto] = useState(null)
  const openPhoto = (src) => setPhoto(Math.max(0, JOURNEY_PHOTOS.findIndex((p) => p.sm === src)))
  return (
    <section id="journey" className="scroll-mt-28 px-5 py-12 sm:py-16">
      <SectionHeading eyebrow="Our journey" title="From a small farm to" highlight="a vision beyond boundaries" subtitle="Built on skills. Driven by willpower. Inspired by vision." />
      <div ref={listRef} className="relative mx-auto mt-14 max-w-5xl">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-[rgba(40,36,110,.12)] lg:left-1/2" aria-hidden="true" />
        <motion.div style={{ scaleY: fill }} className="absolute bottom-0 left-5 top-0 w-[3px] origin-top -translate-x-[1px] rounded-full bg-gradient-to-b from-violet via-blue-500 to-fuchsia-500 lg:left-1/2" aria-hidden="true" />
        <ol className="space-y-12 lg:space-y-16">
          {JOURNEY.map((m, i) => {
            const right = i % 2 === 1
            return (
              <li key={m.year} className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-14 lg:pl-0">
                <span className="absolute left-5 top-6 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#fff] bg-gradient-to-br from-violet to-blue-500 shadow-lg shadow-violet/40 lg:left-1/2" aria-hidden="true" />
                <div aria-hidden="true" className={`hidden items-center font-display text-5xl font-extrabold text-gradient lg:flex ${right ? 'lg:col-start-1 lg:row-start-1 lg:justify-end' : 'lg:col-start-2 lg:row-start-1'}`}>{m.year}</div>
                <Reveal y={36} className={right ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1 lg:row-start-1'}>
                  <JourneyCard m={m} id={`journey-more-${m.year}`} onOpen={openPhoto} />
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
      <Reveal className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet via-[#5b4bf0] to-blue-600 p-8 text-center text-on-brand shadow-xl shadow-violet/25 sm:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[rgba(255,255,255,.18)] blur-2xl" aria-hidden="true" />
        <p className="relative font-display text-lg font-semibold leading-relaxed sm:text-2xl">{JOURNEY_CLOSING}</p>
        <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,.85)]">BALVIRT — Innovate. Collaborate. Elevate.</p>
      </Reveal>
      <PhotoViewer photos={JOURNEY_PHOTOS} index={photo} title={photo === null ? '' : `Our journey · ${JOURNEY_PHOTOS[photo].year}`} onChange={setPhoto} onClose={() => setPhoto(null)} />
    </section>
  )
}

const LEADER_LD = {
  '@context': 'https://schema.org',
  '@graph': LEADERS.map((l) => ({
    '@type': 'Person',
    name: l.name,
    jobTitle: l.role.split('|')[0].trim(),
    image: `${SITE.url}${l.photo}`,
    worksFor: { '@type': 'Organization', name: 'Balvirt', url: SITE.url },
  })),
}

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        jsonLd={LEADER_LD}
        title="About Us | Balvirt: AI, Software & NetSuite ERP Company"
        description={`Balvirt: ${YEARS}+ years helping 10+ SMEs worldwide with AI integrations, automation, custom software and Oracle NetSuite ERP, plus our own products.`}
      />
      <PageHero eyebrow="About Us" title="Transforming businesses through" highlight="innovative technology" subtitle="A technology and consulting team helping companies worldwide simplify operations, automate work and grow with confidence." />

      <section id="who-we-are" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Who <span className="text-gradient">we are</span></h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">For over {YEARS} years, Balvirt has empowered 10+ SMEs across the globe through technology-driven transformation. We combine AI, software and ERP expertise to deliver:</p>
            <div className="mt-6"><BulletList items={OFFER} /></div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[[YEARS, '+', 'Years experience'], [10, '+', 'Projects completed'], [5, '', 'Industries worked']].map(([v, s, l]) => (
                <div key={l} className="glass rounded-2xl p-4 text-center">
                  <div className="text-gradient font-display text-3xl font-extrabold"><Counter value={v} suffix={s} /></div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <TiltCard className="flex items-start gap-5 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><p.icon size={22} /></span>
                  <div><h3 className="text-lg font-semibold">{p.t}</h3><p className="mt-1 text-sm text-muted">{p.d}</p></div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Leaders />

      <section id="mission" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {[
            { icon: Target, t: 'Our mission', lead: 'To empower businesses through innovative, efficient and scalable digital solutions that drive growth, streamline operations and unlock new possibilities.', list: MISSION, img: '/images/about/Mission.png' },
            { icon: Eye, t: 'Our vision', lead: 'To be a trusted global leader in transformative technology and ERP solutions that simplify complexity, enhance productivity and build a smarter future.', list: VISION, img: '/images/about/vision.png' },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.12}>
              <TiltCard className="h-full p-8">
                <img src={b.img} alt={b.t} loading="lazy" className="mb-6 h-48 w-full rounded-2xl object-cover" />
                <div className="flex items-center gap-3"><b.icon className="text-cyan" /><h2 className="text-2xl font-bold">{b.t}</h2></div>
                <p className="mt-3 leading-relaxed text-muted">{b.lead}</p>
                <div className="mt-5"><BulletList items={b.list} /></div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <Journey />

      <section id="values" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="What drives us" title="Our core" highlight="values" />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={(i % 4) * 0.07}>
              <div className="glass h-full rounded-3xl p-6 transition hover:-translate-y-2 hover:border-cyan/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><v.icon size={22} /></span>
                <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted">{v.d}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3} className="overflow-hidden rounded-3xl border border-white/10">
            <img src="/images/about/Core_values[1].png" alt="Balvirt core values illustration" loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <CTA title="Let's build your next chapter" highlight="together" text="Meet the team, see what we build, and start your journey with a consulting team that cares about your results." primary={{ label: 'Contact us', to: '/contact' }} secondary={{ label: 'View careers', to: '/careers' }} />
    </>
  )
}
