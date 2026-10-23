import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Detail from '../components/Detail'
import { InquiryModal } from '../components/forms'
import { Button, ConsultCard, CTA, Icon, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui'
import { SERVICES, YEARS } from '../data/site'
import { TECH_SERVICES } from '../data/company'
import Faq, { faqSchema } from '../components/Faq'

const FAQS = [
  ['What services does Balvirt offer?', 'Balvirt provides AI integrations, automated workflows, custom websites, custom software and AI models, technology consulting and business advisory, alongside specialist Oracle NetSuite ERP services including implementation, customization, integration, data migration and 24/7 support.'],
  ['Can you add AI to the systems we already use?', 'Yes. We connect practical AI, such as assistants, document extraction and predictive insights, to your existing tools and ERP, so you gain speed and accuracy without replacing the software your team relies on.'],
  ['How long does a NetSuite implementation take?', 'A typical NetSuite ERP implementation for an SME takes 2–4 months, depending on business complexity, the number of customizations and the integrations required. Balvirt uses a phased methodology to minimize operational disruption and ensure a smooth go-live.'],
  ['Do you provide post-go-live NetSuite support?', 'Yes. Balvirt provides comprehensive post-implementation NetSuite support, including 24/7 system monitoring, bug fixes, SuiteScript enhancements, user training and ongoing performance optimization to maximize your ERP investment.'],
  ['Can Balvirt integrate NetSuite with our existing systems?', 'Absolutely. We use Celigo iPaaS, custom SuiteScript integrations and RESTlets to connect NetSuite with e-commerce platforms, CRM systems, WMS, EDI, payment gateways and third-party APIs, creating a unified, automated data ecosystem.'],
  ['Do you build custom software, or only configure existing platforms?', 'Both. We build custom web, mobile and enterprise software and AI models when off-the-shelf tools do not fit, and we also offer our own ready-to-use products such as Balsuite, Balfrevo and Layvora.'],
  ['What makes Balvirt different?', `Balvirt combines deep Oracle NetSuite expertise with AI, automation and custom software delivery, and runs its own products. You get one team that can advise, build and support, backed by ${YEARS}+ years, 10+ SME clients and a 98% satisfaction rate across 7 countries.`],
]

const OPTIONS = [
  ...TECH_SERVICES.map((t) => t.title),
  'NetSuite Implementation', 'NetSuite Customization', 'NetSuite Optimization', 'NetSuite Integration',
  'NetSuite Support', 'Data Migration', 'Application Development', 'Other (please specify in message)',
]
const OPTION_FOR = {
  implementation: 'NetSuite Implementation', customization: 'NetSuite Customization', optimization: 'NetSuite Optimization',
  integration: 'NetSuite Integration', support: 'NetSuite Support', 'data-migration': 'Data Migration', 'app-development': 'Application Development',
  ...Object.fromEntries(TECH_SERVICES.map((t) => [t.id, t.title])),
}

function ServiceCard({ s, i }) {
  return (
    <Reveal delay={(i % 4) * 0.07}>
      <Link to={`#${s.id}`} replace className="block h-full">
        <TiltCard className="h-full p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><Icon name={s.icon} size={22} /></span>
          <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
          <span className="mt-4 inline-block text-sm font-medium text-violet">Learn more →</span>
        </TiltCard>
      </Link>
    </Reveal>
  )
}

export default function Services() {
  const [modal, setModal] = useState({ open: false, pre: null, title: 'Get started today' })
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      faqSchema(FAQS),
      ...[...TECH_SERVICES, ...SERVICES].map((x) => ({
        '@type': 'Service', name: x.title, description: x.desc, provider: { '@type': 'Organization', name: 'Balvirt', url: 'https://balvirt.com' }, areaServed: 'Worldwide',
      })),
    ],
  }), [])
  const book = (s) => setModal({ open: true, pre: OPTION_FOR[s.id], title: `Book: ${s.title}` })

  return (
    <>
      <Seo
        path="/services"
        title="AI, Software & NetSuite ERP Services | Balvirt"
        description="AI integrations, automation, app and website development, custom software, consulting, and Oracle NetSuite implementation, customization and support."
        jsonLd={jsonLd}
      />
      <PageHero eyebrow="Our services" title="NetSuite ERP, AI, automation and software," highlight="all from one team" subtitle="From AI integrations and custom software to Oracle NetSuite implementation and 24/7 support, Balvirt helps you plan, build and run the technology behind your business.">
        <Button href="#netsuite">NetSuite ERP services</Button>
        <Button href="#ai-software" variant="ghost">AI, software &amp; consulting</Button>
      </PageHero>

      <section id="netsuite" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Oracle NetSuite" title="Complete NetSuite" highlight="ERP services" subtitle="Our flagship specialty: experienced NetSuite consultants, from implementation and customization to integration and round-the-clock support." />
        <div id="services-overview" className="mx-auto mt-12 grid max-w-7xl scroll-mt-28 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
          <Reveal delay={0.24}><ConsultCard /></Reveal>
        </div>
      </section>

      {SERVICES.map((s, i) => <Detail key={s.id} item={s} index={i} cta="Book this service" onCta={() => book(s)} />)}

      <section id="ai-software" className="scroll-mt-28 px-5 pb-8 pt-16 sm:pt-24">
        <SectionHeading eyebrow="AI, software & consulting" title="Technology built" highlight="around your business" subtitle="Practical AI, automation, websites and software, with consulting and advice to guide every decision." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
          <Reveal delay={0.24}><ConsultCard /></Reveal>
        </div>
      </section>

      {TECH_SERVICES.map((s, i) => <Detail key={s.id} item={s} index={i} cta="Get started" onCta={() => book(s)} />)}

      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="FAQ" title="Frequently asked" highlight="questions" subtitle="Everything you need to know about working with Balvirt." />
        <Faq items={FAQS} />
      </section>

      <CTA title="Ready to build, automate and" highlight="grow?" text="Tell us what you are trying to achieve. We will map out the right mix of AI, software and ERP for your business." secondary={{ label: 'See our products', to: '/products' }} />

      <InquiryModal
        open={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))}
        title={modal.title} intro="Tell us what you need and our team will reply within 24 hours."
        endpoint="services.php" field="services" options={OPTIONS} preselected={modal.pre}
      />
    </>
  )
}
