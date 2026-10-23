import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Brain, Handshake, Hammer, UploadCloud, GraduationCap } from 'lucide-react'
import Seo from '../components/Seo'
import Faq, { faqSchema } from '../components/Faq'
import { Field, Honeypot, Modal, Status, SubmitButton, useSubmit } from '../components/forms'
import { BulletList, Button, CTA, PageHero, Reveal, SectionHeading, TiltCard } from '../components/ui'
import jobs from '../data/jobs.json'
import { MAX_RESUME_MB, emailProps, phoneProps } from '../lib/rules'
import { INSTITUTE } from '../data/company'

const FAQS = [
  ['Do you hire freshers?', 'Yes. We welcome freshers and offer training opportunities, and our 3-month internship programs help students gain practical experience.'],
  ['How do I apply for a job or internship?', 'Choose a role on this page, click Apply now, upload your resume and submit the form. Our team will contact you if you are shortlisted.'],
  ['Which internships do you offer?', 'We offer 3-month Software Development and Quality Analyst internships with real project experience.'],
  ['What is Balvirttechhub?', "Balvirttechhub is Balvirt's own training and career institute, with mentor-led, hands-on programs in Java Full Stack + AI, NetSuite (Functional and Technical) and Generative AI, plus placement preparation."],
  ['Do you provide training for your team?', 'Yes. We run regular training sessions, workshops and learning opportunities to help our team grow professionally.'],
]
const POSITIONS = ['Full Stack Developer', 'Support Specialist', 'Quality Analyst', 'Digital Marketing Analyst', 'Software Development Intern', 'Quality Analyst Intern', 'Other']
const EXPERIENCE = ['Fresher (0 years)', '0-1 years', '1-3 years', '3-5 years', '5+ years']
const JOB_LIST = Object.entries(jobs).map(([key, j]) => ({ key, ...j }))

const INTERNSHIPS = [
  { title: 'Software Development Intern', text: 'Contribute to projects, ERP customization, workflow automation and application development.', image: '/images/1_fresher/it_support_team.jpg' },
  { title: 'Quality Analyst Intern', text: 'Assist the QA team, perform software testing, report bugs and ensure product quality.', image: '/images/carrier/QA-Internship.webp' },
]
const LEARN = [
  { icon: Hammer, t: 'Practical ERP & IT experience', d: 'Real client projects and hands-on implementation experience.' },
  { icon: Brain, t: 'Functional & technical skills', d: 'ERP modules, APIs, cloud integration and system architecture.' },
  { icon: Handshake, t: 'Teamwork & client engagement', d: 'Collaborate with teams and clients in real business scenarios.' },
]

function JobDetail({ job, onClose, onApply }) {
  return (
    <Modal open={!!job} onClose={onClose} title={job?.title || ''} wide>
      {job && (
        <>
          <img src={job.image} alt={job.title} className="mt-5 h-52 w-full rounded-2xl object-cover" />
          <p className="mt-4 text-muted">{job.subtitle}</p>
          {job.sections.map((s) => (
            <div key={s.title} className="mt-6">
              <h3 className="font-display text-lg font-semibold text-cyan">{s.title}</h3>
              {s.blocks.map((b, i) =>
                b.h4 ? <h4 key={i} className="mt-3 text-sm font-semibold">{b.h4}</h4>
                : b.p ? <p key={i} className="mt-2 text-sm text-muted">{b.p}</p>
                : <ul key={i} className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted marker:text-cyan">{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>,
              )}
            </div>
          ))}
          <div className="mt-8"><Button type="button" onClick={() => onApply(job.title)}>Apply now</Button></div>
        </>
      )}
    </Modal>
  )
}

function ApplyForm({ open, onClose, position }) {
  const { state, submit, reset } = useSubmit('hire.php')
  const [fileName, setFileName] = useState('')
  useEffect(() => { if (open) reset() }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Modal open={open} onClose={() => { reset(); onClose() }} title="Apply for a position" wide>
      <form onSubmit={submit} className="relative mt-6 space-y-4" encType="multipart/form-data" key={position}>
        <Honeypot />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" id="firstName" required autoComplete="given-name" minLength={2} maxLength={50} pattern="[\p{L}\p{M}][\p{L}\p{M}\s'’.\-]{1,49}" title="Use letters only (2 to 50 characters)." />
          <Field label="Last name" id="lastName" required autoComplete="family-name" minLength={2} maxLength={50} pattern="[\p{L}\p{M}][\p{L}\p{M}\s'’.\-]{1,49}" title="Use letters only (2 to 50 characters)." />
          <Field label="Email" id="email" type="email" required autoComplete="email" {...emailProps} />
          <Field label="Phone" id="phone" type="tel" required autoComplete="tel" {...phoneProps} />
          <Field label="Position applied for" id="position" as="select" required defaultValue={POSITIONS.includes(position) ? position : ''}>
            <option value="" disabled>Select a position</option>
            {POSITIONS.map((p) => <option key={p} value={p} className="bg-surface">{p}</option>)}
          </Field>
          <Field label="Years of experience" id="experience" as="select" defaultValue="">
            <option value="" disabled>Select experience</option>
            {EXPERIENCE.map((p) => <option key={p} value={p} className="bg-surface">{p}</option>)}
          </Field>
        </div>
        <Field label="Key skills" id="skills" maxLength={300} placeholder="e.g. React, Node.js, SuiteScript" />
        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">Upload resume <span className="text-amber">*</span></span>
          <label htmlFor="resume" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-muted transition hover:border-cyan/60">
            <UploadCloud className="text-cyan" />
            <span>{fileName || 'Choose a PDF, DOC or DOCX file (max 5 MB)'}</span>
            <input id="resume" name="resume" type="file" required accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => { const f = e.target.files[0]; setFileName(f?.name || ''); e.target.setCustomValidity(f && f.size > MAX_RESUME_MB * 1024 * 1024 ? `The resume must be under ${MAX_RESUME_MB} MB.` : ''); if (f && f.size > MAX_RESUME_MB * 1024 * 1024) e.target.reportValidity() }} />
          </label>
        </div>
        <Field label="Cover letter" id="coverLetter" as="textarea" rows={4} maxLength={2000} placeholder="Tell us why you would be a great fit…" />
        <Status state={state} />
        <div className="flex justify-end"><SubmitButton busy={state.busy}>Submit application</SubmitButton></div>
      </form>
    </Modal>
  )
}

export default function Careers() {
  const [job, setJob] = useState(null)
  const [apply, setApply] = useState({ open: false, position: '' })
  const startApply = (position = '') => { setJob(null); setApply({ open: true, position }) }

  return (
    <>
      <Seo
        path="/careers"
        title="Careers at Balvirt | Jobs, Internships & Training"
        jsonLd={faqSchema(FAQS)}
        description="Join Balvirt: fresher jobs, 3-month software and QA internships, and Balvirttechhub training in Java Full Stack + AI, NetSuite and Generative AI."
      />
      <PageHero eyebrow="We're hiring" title="Build your tech career at" highlight="Balvirt" subtitle="We are growing fast and always looking for passionate, talented people to join our technology team.">
        <Button href="#freshers">View open positions</Button>
        <Button type="button" variant="ghost" onClick={() => startApply()}>Go to hire form</Button>
      </PageHero>

      <section id="freshers" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Open roles" title="Opportunities for" highlight="freshers" subtitle="Start your career with real client projects, mentoring and room to grow." />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOB_LIST.map((j, i) => (
            <Reveal key={j.key} delay={i * 0.08}>
              <button onClick={() => setJob(j)} className="block h-full w-full text-left">
                <TiltCard className="h-full">
                  <img src={j.image} alt={j.title} loading="lazy" className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{j.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{j.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan"><Briefcase size={15} /> View details</span>
                  </div>
                </TiltCard>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="internships" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="Learn by doing" title="Internship programs" highlight="(3 months)" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {INTERNSHIPS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <img src={n.image} alt={n.title} loading="lazy" className="h-52 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{n.title}</h3>
                  <p className="mt-2 text-muted">{n.text}</p>
                  <div className="mt-5"><Button type="button" onClick={() => startApply(n.title)}>Apply now</Button></div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="institute" className="scroll-mt-28 px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[rgba(40,36,110,.10)] bg-[#fff] p-6 shadow-xl shadow-violet/10 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><GraduationCap size={22} /></span>
                <span className="rounded-full border border-[rgba(40,36,110,.12)] bg-[#fff] px-3 py-1 text-xs font-medium text-muted">Training &amp; career institute</span>
              </div>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Learn at <span className="text-gradient">{INSTITUTE.name}</span></h2>
              <p className="mt-1 font-display text-lg font-semibold text-violet">{INSTITUTE.tagline}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{INSTITUTE.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {INSTITUTE.tracks.map((t) => <span key={t} className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">{t}</span>)}
              </div>
              <div className="mt-6"><BulletList items={INSTITUTE.points} /></div>
              <div className="mt-8"><Button to="/contact?topic=institute">Enquire now</Button></div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-3">
                <img src={INSTITUTE.image} alt={INSTITUTE.imageAlt} width="1600" height="792" loading="lazy" className="h-auto w-full rounded-[1.5rem]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <SectionHeading eyebrow="Growth" title="What will you" highlight="learn?" />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {LEARN.map((l, i) => (
            <Reveal key={l.t} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="glass h-full rounded-3xl p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-blue-500 text-on-brand shadow-lg shadow-violet/25"><l.icon size={22} /></span>
                <h3 className="mt-5 text-lg font-semibold">{l.t}</h3>
                <p className="mt-2 text-sm text-muted">{l.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:py-16">
        <SectionHeading eyebrow="FAQ" title="Careers at Balvirt:" highlight="your questions" subtitle="What to know before you apply." />
        <Faq items={FAQS} />
      </section>

      <CTA title="Start your journey with" highlight="us" text="Meet the team behind Balvirt, see what we build, and reach out if you would like to be part of it." primary={{ label: 'Start your journey with us', to: '/contact' }} secondary={{ label: 'Meet the team', to: '/about' }} />

      <JobDetail job={job} onClose={() => setJob(null)} onApply={startApply} />
      <ApplyForm open={apply.open} position={apply.position} onClose={() => setApply((a) => ({ ...a, open: false }))} />
    </>
  )
}
