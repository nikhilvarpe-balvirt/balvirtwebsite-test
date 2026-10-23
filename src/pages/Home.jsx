import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Quote, Search, PenTool, Rocket as RocketIcon, LifeBuoy, ShieldCheck, Cloud, Cpu } from 'lucide-react'
import Seo from '../components/Seo'
import { Button, ConsultCard, Counter, CTA, Eyebrow, Icon, Reveal, SectionHeading, TiltCard } from '../components/ui'
import { INDUSTRIES, SITE, STATS, YEARS } from '../data/site'
import { PRODUCTS, TECH_SERVICES } from '../data/company'

const ROTATING = ['AI Solutions', 'NetSuite ERP', 'Automation', 'Custom Software', 'Web Platforms']
const MARQUEE = ['AI Integrations', 'Workflow Automation', 'Oracle NetSuite', 'Custom Software', 'Custom Websites', 'Balsuite', 'Freymora', 'Layvora', 'Celigo iPaaS', 'Business Advisory']

const OFFERINGS = [
  { id: 'netsuite', icon: 'Rocket', title: 'Oracle NetSuite ERP', short: 'Implementation, customization, integration and 24/7 support from experienced consultants.' },
  ...TECH_SERVICES,
]

const STEPS = [
  { icon: Search, title: 'Discover', text: 'We study your operations and goals, then define the exact scope, whether that is AI, automation, software or ERP, that solves the real problem.' },
  { icon: PenTool, title: 'Design', text: 'We architect a tailored solution, from workflows and integrations to dashboards and interfaces, built around your industry and your people.' },
  { icon: RocketIcon, title: 'Build & Deploy', text: 'We build, test and launch with data migration, team training and a smooth cutover so your team can adopt it quickly.' },
  { icon: LifeBuoy, title: 'Support', text: 'After go-live we provide continuous monitoring, optimization and enhancements to keep your investment delivering value.' },
]

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE.url}/#organization`,
      name: 'Balvirt',
      url: SITE.url,
      logo: `${SITE.url}/images/logo1.png`,
      image: `${SITE.url}/images/og-share.jpg`,
      description: 'Technology and consulting company offering AI integrations, automated workflows, custom websites and software, app development, Oracle NetSuite ERP services and its own products: Balsuite, Freymora and Layvora.',
      email: SITE.email,
      telephone: SITE.phone,
      founder: { '@type': 'Person', name: 'Ramdas Darade', jobTitle: 'Founder & CEO' },
      address: { '@type': 'PostalAddress', streetAddress: 'First Floor, Hirai Estate, Adarsh Nagar, Ghulewadi', addressRegion: 'Maharashtra', postalCode: '422605', addressCountry: 'IN' },
      areaServed: ['India', 'Worldwide'],
      knowsAbout: ['Oracle NetSuite', 'NetSuite implementation', 'SuiteScript customization', 'Celigo integration', 'AI integration', 'Workflow automation', 'Custom software development', 'Mobile app development', 'Website development', 'ERP consulting'],
      contactPoint: { '@type': 'ContactPoint', telephone: SITE.phone, email: SITE.email, contactType: 'sales', areaServed: 'Worldwide', availableLanguage: ['English', 'Hindi', 'Marathi'] },
      sameAs: Object.values(SITE.social),
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: 'Balvirt', publisher: { '@id': `${SITE.url}/#organization` }, inLanguage: 'en' },
  ],
}

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % ROTATING.length), 2400)
    return () => clearInterval(t)
  }, [])
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -80])
  const y2 = useTransform(scrollY, [0, 600], [0, 60])

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="aurora -left-32 top-10 -z-10 h-[28rem] w-[28rem] bg-violet" />
      <div className="aurora -right-24 top-40 -z-10 h-[24rem] w-[24rem] bg-cyan" style={{ animationDelay: '-5s' }} />
      <div className="aurora bottom-0 left-1/3 -z-10 h-72 w-72 bg-fuchsia-400/50" style={{ animationDelay: '-9s' }} />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Eyebrow>AI · Software · ERP · Consulting</Eyebrow>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-6 text-[2.4rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem] xl:text-7xl">
            We deliver
            <span className="relative mt-1 block h-[1.15em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={ROTATING[i]} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45 }} className="text-gradient absolute inset-x-0 top-0">
                  {ROTATING[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            built to scale with you.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            Balvirt is a technology and consulting company. We help growing businesses become Cloud-ready, Data-ready and AI-ready with AI integrations, automated workflows, custom software, Oracle NetSuite ERP and our own ready-to-use products.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-9 flex flex-wrap gap-4">
            <Button to="/contact">Get a Free Consultation</Button>
            <Button to="/services" variant="ghost">Explore Our Services</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 grid max-w-md grid-cols-3 gap-4 sm:flex sm:max-w-none sm:flex-wrap sm:gap-x-10">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold sm:text-3xl"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="text-[10px] uppercase leading-snug tracking-wider text-muted sm:text-xs">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual: layered dashboard cards */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative mx-auto aspect-square w-full max-w-md min-w-0 lg:max-w-none">
          <motion.div style={{ y: y1 }} className="glass glow-border absolute inset-6 overflow-hidden rounded-[2rem] p-3">
            <img src="/images/home/netsuite.png" alt="Oracle NetSuite ERP dashboard delivered by Balvirt" className="h-full w-full rounded-[1.5rem] object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} animate={{ rotate: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} className="glass absolute left-0 top-10 flex items-center gap-3 rounded-2xl px-4 py-3 2xl:-left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-600"><ShieldCheck size={20} /></span>
            <div><div className="font-display text-xl font-bold">98%</div><div className="text-[11px] uppercase tracking-wider text-muted">Satisfaction</div></div>
          </motion.div>
          <motion.div style={{ y: y1 }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="glass absolute bottom-16 right-0 flex items-center gap-3 rounded-2xl px-4 py-3 2xl:-right-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/25 text-violet"><Cloud size={20} /></span>
            <div><div className="font-display text-xl font-bold">7+ countries</div><div className="text-[11px] uppercase tracking-wider text-muted">Clients served</div></div>
          </motion.div>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="glass absolute bottom-2 left-8 flex items-center gap-3 rounded-2xl px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/20 text-cyan"><Cpu size={20} /></span>
            <div><div className="font-display text-xl font-bold">24/7</div><div className="text-[11px] uppercase tracking-wider text-muted">Support</div></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee overflow-hidden border-y border-white/8 bg-white/[0.02] py-5" aria-hidden>
      <div className="marquee-track flex gap-12">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-lg font-semibold text-white/50">
            {m}<span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Showreel() {
  const ref = useRef(null)
  useEffect(() => { ref.current?.play().catch(() => {}) }, [])
  return (
    <video ref={ref} className="pointer-events-none aspect-video w-full rounded-[1.6rem] object-cover" src="/images/videos/home.mp4" poster="/images/home/digitalhd.jpg" muted loop playsInline autoPlay preload="metadata" disablePictureInPicture disableRemotePlayback tabIndex={-1} aria-label="Balvirt company showreel" />
  )
}

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Balvirt | AI, Custom Software & NetSuite ERP Consulting"
        description="AI integrations, workflow automation, custom software and Oracle NetSuite ERP consulting in India. Explore our products: Balsuite, Freymora and Layvora."
        jsonLd={JSON_LD}
      />
      <Hero />
      <Marquee />

      {/* About / video */}
      <section className="px-5 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>About Balvirt</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">Expert consulting for <span className="text-gradient">AI, software &amp; ERP</span></h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>Balvirt helps businesses become Cloud-ready, Data-ready and AI-ready. We build AI integrations, automated workflows, custom websites and software, and give the consulting and business advice that keeps projects on track.</p>
              <p>We also provide specialist Oracle NetSuite ERP consulting for Manufacturing, Retail, Wholesale and E-Commerce businesses, and we build and run our own products: Balsuite, Freymora and Layvora.</p>
              <p>With {YEARS}+ years of delivery experience and a 98% client satisfaction rate, we make sure every solution delivers measurable results and lasting value.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/about">About Balvirt</Button>
              <Button to="/technology" variant="ghost">Explore our technology</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-2">
              <Showreel />
            </div>
            <p className="mt-4 text-center text-sm text-muted">Simplify. Automate. Grow.</p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="What we do" title="Everything you need to" highlight="build, automate and grow" subtitle="AI, software and ERP expertise from one team, with consulting and business advice to guide every decision." />
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.08}>
              <Link to={`/services#${s.id}`} className="block h-full">
                <TiltCard className="h-full p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><Icon name={s.icon} size={22} /></span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-violet">Learn more →</span>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={0.24}><ConsultCard /></Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Our products" title="Software built by Balvirt," highlight="ready for your business" subtitle="Proven platforms for business management, logistics and farming, so you can start fast instead of building from scratch." />
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link to={`/products#${p.id}`} className="group block h-full">
                <TiltCard className="h-full">
                  {p.imageSm ? (
                    <div className="relative aspect-[2/1] overflow-hidden bg-[#eef2ff]">
                      <img src={p.imageSm} alt={p.imageAlt || p.name} width="800" height="400" loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
</div>
                  ) : (
                    <div className={`relative overflow-hidden bg-gradient-to-br ${p.gradient} p-6 text-on-brand`}>
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(255,255,255,.25)]"><Icon name={p.icon} size={26} /></span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs font-medium uppercase tracking-wider text-cyan">{p.category}</div>
                    <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{p.badges.map((b) => <span key={b} className="rounded-full bg-violet/10 px-2.5 py-1 text-[11px] font-semibold text-violet">{b}</span>)}</div>
                    <span className="mt-5 inline-block text-sm font-medium text-violet">Explore →</span>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Button to="/products">View all products</Button></div>
      </section>

      {/* Process */}
      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Our methodology" title="How we deliver" highlight="results" subtitle="A proven four-step approach that keeps every project on time, within budget and built for lasting value." />
        <div className="relative mx-auto mt-16 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent lg:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="glass relative h-full rounded-3xl p-7 transition hover:-translate-y-2 hover:border-cyan/40">
                <span className="absolute right-6 top-5 font-display text-6xl font-extrabold text-white/[0.08]">0{i + 1}</span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan text-on-brand shadow-lg shadow-violet/30"><s.icon size={24} /></span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Button to="/services">Explore all services</Button></div>
      </section>

      {/* Industries */}
      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Industries" title="Solutions shaped by" highlight="your industry" subtitle="Industry-specific configurations, workflows and reporting for the sectors we know best." />
        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={i * 0.07}>
              <Link to={`/industries#${ind.id}`} className="group relative block h-72 overflow-hidden rounded-3xl border border-white/10">
                <img src={ind.image} alt={`${ind.title} NetSuite ERP solutions`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14173a]/90 via-[#14173a]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Icon name={ind.icon} size={20} className="text-[#7be8ff]" />
                  <h3 className="mt-2 text-lg font-semibold text-on-brand">{ind.title}</h3>
                  <span className="text-xs text-[#d6d9ff] opacity-0 transition group-hover:opacity-100">View solutions →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Track record */}
      <section className="px-5 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-card to-surface p-10 sm:p-16">
          <div className="aurora -right-10 -top-10 h-72 w-72 bg-violet" />
          <SectionHeading eyebrow="Proven track record" title="Trusted technology and" highlight="ERP consulting" subtitle="Helping businesses grow with technology and ERP across 7+ countries." />
          <div className="relative mt-14 grid grid-cols-2 gap-8 md:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-gradient font-display text-5xl font-extrabold"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="mt-2 text-xs uppercase tracking-wider text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Client voice" title="What our" highlight="clients say" subtitle="Trusted by growing businesses across Manufacturing, Retail and Distribution." />
        <Reveal className="glass glow-border relative mx-auto mt-12 max-w-3xl rounded-3xl p-8 text-center sm:p-12">
          <Quote className="mx-auto text-violet" size={36} />
          <p className="mt-5 text-xl leading-relaxed sm:text-2xl">
            We are proud to partner with Balvirt. Their team of skilled software QAs and developers possesses extensive expertise in NetSuite, making them a reliable partner for any NetSuite solution.
          </p>
          <div className="mt-6 flex justify-center gap-1 text-amber">{'★★★★★'}</div>
          <div className="mt-3 font-display font-semibold">Alexander Blaschitz</div>
          <div className="text-sm text-muted">Head of Development, Advectus EMEA</div>
          <div className="mt-8"><Button to="/why-us" variant="ghost">Read more client stories</Button></div>
        </Reveal>
      </section>

      <CTA title="Ready to simplify, automate and" highlight="grow?" text="Tell us what you are trying to achieve. We will map out the right mix of AI, software and ERP for your business." secondary={{ label: 'Meet the team', to: '/about' }} />
    </>
  )
}
