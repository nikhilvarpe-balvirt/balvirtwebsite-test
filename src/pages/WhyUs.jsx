import { Quote } from 'lucide-react'
import Seo from '../components/Seo'
import { Button, Counter, CTA, PageHero, Reveal } from '../components/ui'

const STATS = [
  { v: 5, s: '', l: 'Projects completed' },
  { v: 10, s: '+', l: 'Experienced consultants' },
  { v: 98, s: '%', l: 'Client satisfaction' },
  { v: 7, s: '+', l: 'Countries served' },
]

const REASONS = [
  {
    id: 'team', title: 'Experienced Team', image: '/images/experincedteam 2.png.jpg',
    text: 'Our experienced NetSuite professionals have delivered solutions across manufacturing, retail, finance and technology. Every consultant combines technical skill with strong business acumen, so our solutions align with your strategic objectives. With years of proven expertise, we help organizations overcome complex challenges, optimize processes and stay ahead of the competition.',
  },
  {
    id: 'solutions', title: 'Tailored Solutions', image: '/images/Tailored_Solution[1].png',
    text: "Every business is unique, which is why we never offer cookie-cutter implementations. We take the time to understand your workflows, compliance requirements and growth strategies, then deliver a NetSuite solution that is scalable, flexible and designed for your evolving needs, whether you are a startup chasing rapid growth or an enterprise pursuing digital transformation.",
  },
  {
    id: 'support', title: 'End-to-End Support', image: '/images/End_to_end_support[2].png',
    text: "Our commitment doesn't end at deployment. We work with you from the first consultation and requirement gathering through implementation, training and post-go-live support. Our dedicated team ensures smooth adoption, proactive issue resolution and continuous optimization, with regular updates, best-practice insights and performance monitoring so your systems always run at peak efficiency.",
  },
  {
    id: 'track-record', title: 'Proven Track Record', image: '/images/track-record.png',
    text: 'We have a history of successful implementations across industries and geographies. Our projects consistently deliver measurable outcomes such as faster decision-making, improved productivity and reduced operating costs. Clients trust us to execute complex deployments on time and on budget while ensuring long-term scalability.',
  },
]

export default function WhyUs() {
  return (
    <>
      <Seo
        path="/why-us"
        title="Why Choose Balvirt | Experienced AI, Software & ERP Team"
        description="Experienced consultants, tailored solutions, end-to-end support and a proven track record across 7+ countries, from AI and software to NetSuite ERP."
      />
      <PageHero eyebrow="Why Balvirt" title="Why businesses choose" highlight="Balvirt" subtitle="Discover how our expertise, tailored solutions and unwavering support transform business operations and drive sustainable growth.">
        <Button href="#team">Explore our strengths</Button>
      </PageHero>

      <section className="px-5 pb-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="glass rounded-3xl p-6 text-center">
              <div className="text-gradient font-display text-4xl font-extrabold"><Counter value={s.v} suffix={s.s} /></div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {REASONS.map((r, i) => (
        <section key={r.id} id={r.id} className="scroll-mt-28 px-5 py-10 sm:py-14">
          <div className={`mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <Reveal y={40}>
              <span className="font-display text-7xl font-extrabold text-white/[0.07]">0{i + 1}</span>
              <h2 className="-mt-6 text-3xl font-bold sm:text-4xl">{r.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{r.text}</p>
              {r.id === 'track-record' && (
                <figure className="glass mt-8 rounded-2xl p-6">
                  <Quote className="text-violet" size={26} />
                  <blockquote className="mt-3 leading-relaxed">We are proud to partner with Balvirt. Their team of skilled software QAs and developers possesses extensive expertise in NetSuite, making them a reliable partner for any NetSuite solution.</blockquote>
                  <figcaption className="mt-4 text-sm"><span className="font-display font-semibold">Alexander Blaschitz</span><span className="text-muted"> · Head of Development, Advectus EMEA</span><span className="ml-2 text-amber">★★★★★</span></figcaption>
                </figure>
              )}
            </Reveal>
            <Reveal delay={0.12} y={40}>
              <div className="glass glow-border overflow-hidden rounded-[2rem] p-3">
                <img src={r.image} alt={r.title} loading="lazy" className="h-auto w-full rounded-[1.5rem]" />
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CTA title="Ready to grow your business with" highlight="Balvirt?" text="Let's discuss how Balvirt can transform your operations with the right mix of AI, software and ERP, built around your goals." primary={{ label: 'Book a free consultation', to: '/contact' }} secondary={{ label: 'Explore our services', to: '/services' }} />
    </>
  )
}
