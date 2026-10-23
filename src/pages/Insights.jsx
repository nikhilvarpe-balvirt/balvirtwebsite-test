import { useState } from 'react'
import { Play } from 'lucide-react'
import Seo from '../components/Seo'
import PhotoViewer from '../components/PhotoViewer'
import { Button, Counter, CTA, PageHero, Reveal, SectionHeading } from '../components/ui'
import { SITE } from '../data/site'

const VIDEO_ID = 'vwA2EQVGwAo'
const ACHIEVEMENTS = [
  { v: 5, s: '', l: 'Projects completed' },
  { v: 98, s: '%', l: 'Client satisfaction' },
  { v: 10, s: '', l: 'Experienced consultants' },
  { v: 5, s: '', l: 'Industries served' },
]
const PHOTOS = [
  { sm: '/images/insights/team-group-sm.webp', lg: '/images/insights/team-group-lg.webp', w: 720, h: 540, alt: 'The Balvirt team together after a workshop' },
  { sm: '/images/insights/felicitation-sm.webp', lg: '/images/insights/felicitation-lg.webp', w: 720, h: 540, alt: 'A bouquet felicitation at a Balvirt workshop' },
  { sm: '/images/insights/workshop-wide-sm.webp', lg: '/images/insights/workshop-wide-lg.webp', w: 720, h: 405, alt: 'A workshop session in the Balvirt office' },
  { sm: '/images/insights/speaker-sm.webp', lg: '/images/insights/speaker-lg.webp', w: 720, h: 405, alt: 'A speaker presenting to the Balvirt team' },
  { sm: '/images/insights/audience-sm.webp', lg: '/images/insights/audience-lg.webp', w: 720, h: 405, alt: 'Balvirt team members listening during a workshop' },
  { sm: '/images/insights/session-sm.webp', lg: '/images/insights/session-lg.webp', w: 720, h: 405, alt: 'A speaker addressing the team during a session' },
]

export default function Insights() {
  const [play, setPlay] = useState(false)
  const [lb, setLb] = useState(null)
  return (
    <>
      <Seo
        path="/insights"
        title="Insights, Videos & Webinars | Balvirt"
        description="Tutorials, webinars and achievement highlights from the Balvirt team, plus a look at learning and wellness activities at our company."
      />
      <PageHero eyebrow="Insights & resources" title="Insights and resources from the" highlight="Balvirt team" subtitle="Tutorials, webinars and achievement highlights from the Balvirt team." />

      <section id="youtube" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Watch" title="YouTube" highlight="videos" />
        <Reveal className="glass glow-border mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl p-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
            {play ? (
              <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`} title="What makes us what we are today" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <button onClick={() => setPlay(true)} className="group absolute inset-0 block w-full" aria-label="Play video: What makes us, what we are today">
                <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="Video thumbnail" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/40" />
                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan shadow-2xl transition group-hover:scale-110"><Play fill="white" className="ml-1" /></span>
              </button>
            )}
          </div>
          <div className="px-3 pb-2 pt-4">
            <h3 className="text-xl font-semibold">What makes us, what we are today!</h3>
            <p className="mt-1 text-sm text-muted">A step-by-step look at the NetSuite ERP implementation process and the team behind it.</p>
            <div className="mt-4"><Button href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" variant="ghost">Visit our YouTube channel</Button></div>
          </div>
        </Reveal>
      </section>

      <section id="achievements" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Milestones" title="Our" highlight="achievements" />
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.l} delay={i * 0.08} className="glass rounded-3xl p-7 text-center">
              <div className="text-gradient font-display text-5xl font-extrabold"><Counter value={a.v} suffix={a.s} /></div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted">{a.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="webinars" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Culture" title="Webinars and" highlight="wellness activities" subtitle="Learning sessions, meditation and recognition moments at Balvirt." />
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.sm} delay={(i % 4) * 0.06} className={i === 0 || i === PHOTOS.length - 1 ? 'md:col-span-2' : ''}>
              <button onClick={() => setLb(i)} className="group block h-full w-full overflow-hidden rounded-2xl border border-[rgba(40,36,110,.10)] shadow-md shadow-violet/10" aria-label={`Open photo ${i + 1} of ${PHOTOS.length}`}>
                <img src={p.sm} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-full max-h-72 min-h-44 w-full object-cover transition duration-700 group-hover:scale-110" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA title="Share your ideas with" highlight="us" text="Learn more about Balvirt, see our industry impact, or tell us what you would like to build with us." primary={{ label: 'Share your ideas with us', to: '/contact' }} secondary={{ label: 'See our industry impact', to: '/industries' }} />
      <PhotoViewer photos={PHOTOS} index={lb} title="Webinars and wellness activities" onChange={setLb} onClose={() => setLb(null)} />
    </>
  )
}
