import { Blocks, Bot, Cloud, Globe, Plug, Smartphone } from 'lucide-react'
import Seo from '../components/Seo'
import { BulletList, Button, CTA, PageHero, Reveal, TiltCard, Visual } from '../components/ui'

const PLATFORMS = [
  {
    id: 'ai-automation', icon: Bot, title: 'AI & Workflow Automation',
    text: 'We connect practical AI and automation to the systems you already run, from assistants and document extraction to approvals, notifications and system-to-system syncing, so your team spends time on work that matters.',
    points: ['AI assistants, chatbots and document extraction', 'Automated approvals, notifications and reports', 'Predictive insights from your own data', 'Connects to NetSuite and other business systems'],
  },
  {
    id: 'netsuite', icon: Cloud, title: 'Oracle NetSuite',
    text: 'NetSuite is the number one cloud ERP, providing complete business management in a single platform. Our team specializes in implementation, customization and ongoing support so your deployment fits your business perfectly.',
    points: ['#1 cloud ERP solution', 'Implementation, customization and support', 'End-to-end financials, CRM, HR and inventory', 'Third-party integrations'],
    image: '/images/technology/Netsuite_T[1].png',
  },
  {
    id: 'celigo', image: '/images/Celigo[1].png', icon: Plug, title: 'Celigo iPaaS',
    text: "Celigo's integration Platform as a Service lets you automate complex processes across your application landscape. We combine pre-built and custom connectors to create seamless, reliable integration flows.",
    points: ['Automate processes with Celigo iPaaS', 'Pre-built and custom ERP and SaaS connectors', 'Real-time data flow and error-free automation'],
  },
  {
    id: 'integration', image: '/images/integration_4.jpg', icon: Blocks, title: 'API & System Integration',
    text: 'Our integration expertise covers API development and system integration across cloud, SaaS and on-premises environments. We design secure, scalable data architectures that grow with your business.',
    points: ['API development and system integration (cloud, SaaS, on-premises)', 'NetSuite and Celigo expertise', 'Secure, scalable data architecture'],
  },
  {
    id: 'android', image: '/images/appdevelopment.png', icon: Smartphone, title: 'Android App Development',
    text: 'We build native Android applications with modern UI/UX design. Our mobile solutions integrate seamlessly with ERP, CRM and enterprise systems, extending your business capabilities to mobile users.',
    points: ['Native Android applications', 'Modern UI/UX design', 'ERP, CRM and enterprise system integration'],
  },
  {
    id: 'website', image: '/images/web.png', icon: Globe, title: 'Website Development',
    text: 'Our web development services include custom websites, business portals and eCommerce solutions. We build responsive, SEO-friendly, high-performance sites that connect seamlessly to your business systems.',
    points: ['Custom websites, portals and eCommerce solutions', 'Responsive, SEO-friendly, high-performance sites', 'Integration with ERP and CRM tools'],
  },
]

export default function Technology() {
  return (
    <>
      <Seo
        path="/technology"
        title="AI, NetSuite, Celigo & Integration Technology | Balvirt"
        description="Our technology stack: AI and workflow automation, Oracle NetSuite, Celigo iPaaS, API integration, Android apps and SEO-friendly websites."
      />
      <PageHero eyebrow="Technology" title="Best-in-class platforms to drive your" highlight="digital transformation" subtitle="At Balvirt we combine AI, NetSuite, Celigo and modern integration technologies to build solutions that scale.">
        <Button to="/services">Explore our services</Button>
        <Button to="/industries" variant="ghost">Industries we empower</Button>
      </PageHero>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl space-y-8">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.id} id={p.id} className="scroll-mt-28">
              <TiltCard className="p-7 sm:p-10">
                <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
                  <div className={i % 2 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan text-on-brand shadow-lg shadow-violet/30"><p.icon size={26} /></span>
                      <span className="font-display text-5xl font-extrabold text-white/10">0{i + 1}</span>
                    </div>
                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">{p.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                    <div className="mt-6"><BulletList items={p.points} /></div>
                  </div>
                  <Visual icon="Sparkles" title={p.title} image={p.image} alt={`${p.title} overview`} chips={p.points} gradient="from-violet to-blue-500" />
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA title="Talk to our" highlight="technology experts" text="Share your systems and goals. We will recommend the right technology and application stack." primary={{ label: 'Talk to our tech experts', to: '/contact' }} />
    </>
  )
}
