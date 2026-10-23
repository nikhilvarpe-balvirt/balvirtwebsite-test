import { useState } from 'react'
import { Gauge, Zap, Target } from 'lucide-react'
import Seo from '../components/Seo'
import Faq, { faqSchema } from '../components/Faq'
import Detail from '../components/Detail'
import { InquiryModal } from '../components/forms'
import { Button, Counter, CTA, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui'
import { INDUSTRIES } from '../data/site'

const FAQS = [
  ['Which industries does Balvirt serve?', 'We provide technology and Oracle NetSuite ERP solutions for Manufacturing, Retail, Wholesale Distribution, Automotive dealership management (DMS) and E-Commerce businesses.'],
  ['Can the solution be tailored to my industry?', 'Yes. Every engagement includes industry-specific configurations, workflows and reporting, built around your processes, with NetSuite customization using SuiteScript where needed.'],
  ['How does NetSuite help manufacturers?', 'It helps you streamline production processes, track inventory and the supply chain in real time, and use real-time analytics to reduce downtime.'],
  ['Can you connect NetSuite to our online store and other systems?', 'Yes. We integrate NetSuite with e-commerce platforms, payment gateways, CRM and logistics tools using Celigo and custom integrations, so orders and inventory stay in sync.'],
  ['How do I get started?', 'Request a free consultation from this page or the Contact page. An experienced consultant will reply within 24 hours.'],
]
const OPTIONS = ['Manufacturing', 'Retail', 'Wholesale Distribution', 'Automotive DMS', 'E-Commerce', 'Other (please specify in message)']
const OPTION_FOR = { manufacturing: 'Manufacturing', retail: 'Retail', wholesale: 'Wholesale Distribution', automotive: 'Automotive DMS', ecommerce: 'E-Commerce' }

const STATS = [
  { v: 5, s: '', l: 'Industries served' },
  { v: 10, s: '+', l: 'Successful projects' },
  { v: 10, s: '+', l: 'Happy clients' },
  { v: 7, s: '+', l: 'Countries' },
]
const WHY = [
  { icon: Target, t: 'Industry expertise', d: 'Deep understanding of industry-specific challenges and regulatory requirements.' },
  { icon: Zap, t: 'Rapid implementation', d: 'Quick deployment with minimal disruption to your business operations.' },
  { icon: Gauge, t: 'Proven methodology', d: 'A structured approach that delivers successful projects every time.' },
]

export default function Industries() {
  const [modal, setModal] = useState({ open: false, pre: null, title: 'Get started today' })
  const open = (pre, title) => setModal({ open: true, pre, title })

  return (
    <>
      <Seo
        path="/industries"
        title="ERP & Software for Manufacturing, Retail & More | Balvirt"
        jsonLd={faqSchema(FAQS)}
        description="Technology and Oracle NetSuite ERP solutions for manufacturing, retail, wholesale distribution, automotive dealerships and e-commerce businesses."
      />
      <PageHero eyebrow="Industries we serve" title="Technology and ERP solutions built for" highlight="your industry" subtitle="We deliver industry-specific solutions, including Oracle NetSuite ERP, that address your unique challenges and drive measurable growth, efficiency and digital transformation.">
        <Button onClick={() => open(null, 'Get started today')} type="button">Talk to an expert</Button>
        <Button to="/services" variant="ghost">View our services</Button>
      </PageHero>

      <section className="px-5 pb-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="glass rounded-3xl p-6 text-center">
              <div className="text-gradient font-display text-4xl font-extrabold"><Counter value={s.v} suffix={s.s} /></div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {INDUSTRIES.map((ind, i) => (
        <Detail key={ind.id} item={ind} index={i} number cta="Free consultation" onCta={() => open(OPTION_FOR[ind.id], `Consult on ${ind.title}`)} />
      ))}

      <section className="px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Why Balvirt" title="Why industries choose" highlight="Balvirt" />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.1}>
              <TiltCard className="h-full p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><w.icon size={22} /></span>
                <h3 className="mt-5 text-xl font-semibold">{w.t}</h3>
                <p className="mt-2 text-muted">{w.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="FAQ" title="Industry solutions:" highlight="common questions" subtitle="Quick answers about how Balvirt supports your industry." />
        <Faq items={FAQS} />
      </section>

      <CTA title="Ready to upgrade your industry with" highlight="smarter solutions?" text="Let's discuss how Balvirt can help your business achieve operational excellence with industry-specific technology and ERP solutions." primary={{ label: "We're here to help", to: '/contact' }} secondary={{ label: 'View our services', to: '/services' }} />

      <InquiryModal
        open={modal.open} onClose={() => setModal((m) => ({ ...m, open: false }))}
        title={modal.title} intro="Tell us about your business and we will reply within 24 hours."
        endpoint="industries.php" field="industries" options={OPTIONS} preselected={modal.pre}
      />
    </>
  )
}
