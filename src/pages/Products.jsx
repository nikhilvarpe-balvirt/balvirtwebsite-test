import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, SlidersHorizontal, LifeBuoy, Maximize2, Sparkles } from 'lucide-react'
import Seo from '../components/Seo'
import { InquiryModal } from '../components/forms'
import Lightbox from '../components/Lightbox'
import { BulletList, Button, CTA, Icon, PageHero, Reveal, SectionHeading, TiltCard, Visual } from '../components/ui'
import { PRODUCTS } from '../data/company'
import { SITE } from '../data/site'

const SHOTS = PRODUCTS.map((p) => p.image)
const OPTIONS = [...PRODUCTS.map((p) => p.name), 'Other (please specify in message)']
const WHY = [
  { icon: ShieldCheck, t: 'Built in-house', d: 'Designed and maintained by the Balvirt team, so you work directly with the people who built it.' },
  { icon: SlidersHorizontal, t: 'Configurable to you', d: 'Adapt workflows, fields and roles to the way your business actually works.' },
  { icon: LifeBuoy, t: 'Backed by support', d: 'Onboarding help and ongoing support from our team after you go live.' },
]

export default function Products() {
  const [modal, setModal] = useState({ open: false, pre: null, title: 'Request a demo' })
  const [lb, setLb] = useState(null)
  const open = (name) => setModal({ open: true, pre: name, title: name ? `Request a demo: ${name}` : 'Request a demo' })

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': PRODUCTS.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      applicationCategory: 'BusinessApplication',
      description: p.desc,
      url: `${SITE.url}/products#${p.id}`,
      publisher: { '@type': 'Organization', name: 'Balvirt' },
    })),
  }), [])

  return (
    <>
      <Seo
        path="/products"
        title="Software Products: Balsuite, Balfrevo, Layvora | Balvirt"
        description="Balsuite business management platform, Balfrevo freight brokerage system and Layvora poultry farm management app, built by Balvirt."
        jsonLd={jsonLd}
      />
      <PageHero eyebrow="Our products" title="Ready-to-use software," highlight="built by Balvirt" subtitle="Beyond consulting, we build and run our own platforms for business management, logistics and farming, so you can start with proven software instead of from scratch.">
        <Button href="#balsuite">Explore products</Button>
        <Button type="button" variant="ghost" onClick={() => open(null)}>Request a demo</Button>
      </PageHero>

      <section className="px-5 pb-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <Link to={`#${p.id}`} replace className="block h-full">
                <TiltCard className="h-full p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-on-brand shadow-lg shadow-violet/25`}><Icon name={p.icon} size={22} /></span>
                  <div className="mt-4 text-xs font-medium uppercase tracking-wider text-cyan">{p.category}</div>
                  <h2 className="mt-1 text-xl font-semibold">{p.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-violet">Learn more →</span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {PRODUCTS.map((p, i) => (
        <section key={p.id} id={p.id} className="scroll-mt-28 px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <Reveal y={30} className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-on-brand shadow-lg shadow-violet/25`}><Icon name={p.icon} size={21} /></span>
                <span className="rounded-full border border-[rgba(40,36,110,.12)] bg-[#fff] px-3 py-1 text-xs font-medium text-muted">{p.category}</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{p.name}</h2>
              <p className="mt-1 font-display text-lg font-semibold text-gradient">{p.tagline}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{p.desc}</p>
            </Reveal>

            <Reveal delay={0.1} y={40} className="mt-8">
              <div className="glass glow-border relative overflow-hidden rounded-[1.75rem] p-2 sm:rounded-[2rem] sm:p-3">
                {p.image ? (
                  <button type="button" onClick={() => setLb(i)} aria-label={`Enlarge ${p.name} preview`} className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] bg-[#fff] text-left sm:rounded-[1.5rem]">
                    <img src={p.image} alt={p.imageAlt || p.name} width="1600" height="795" loading="lazy" className="h-auto w-full transition duration-700 group-hover:scale-[1.02]" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#1a1b3a]/85 px-3 py-1.5 text-xs font-medium text-on-brand opacity-0 transition group-hover:opacity-100 max-sm:opacity-100"><Maximize2 size={13} /> Enlarge</span>
                  </button>
                ) : (
                  <Visual icon={p.icon} title={p.name} gradient={p.gradient} chips={p.badges} alt={`${p.name} by Balvirt`} />
                )}
              </div>
            </Reveal>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
              <Reveal>
                <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-muted">Key features</h3>
                <BulletList items={p.features} columns />
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-violet"><Sparkles size={16} aria-hidden="true" /> …and much more</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="rounded-2xl border border-[rgba(40,36,110,.10)] bg-[#fff] p-4 text-sm text-muted"><strong className="text-ink">Best for: </strong>{p.audience}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.badges.map((b) => <span key={b} className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">{b}</span>)}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button type="button" onClick={() => open(p.name)}>Request a demo</Button>
                  <Button to="/contact" variant="ghost">Talk to us</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Why Balvirt products" title="Software you can" highlight="rely on" />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.1}>
              <div className="glass h-full rounded-3xl p-7 transition hover:-translate-y-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><w.icon size={22} /></span>
                <h3 className="mt-5 text-lg font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA title="Need something that doesn't exist" highlight="yet?" text="If none of these fit, we design and build custom software, AI solutions and automation around your process." primary={{ label: 'Talk to our team', to: '/contact' }} secondary={{ label: 'See custom software services', to: '/services#software' }} />

      <Lightbox images={SHOTS} index={lb} onChange={setLb} onClose={() => setLb(null)} />

      <InquiryModal
        open={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))}
        title={modal.title} intro="Tell us which product you are interested in and we will arrange a demo."
        endpoint="services.php" field="services" options={OPTIONS} preselected={modal.pre} source="product"
      />
    </>
  )
}
