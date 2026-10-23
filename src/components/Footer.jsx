import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUp, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react'
import { SITE } from '../data/site'
import { PRODUCTS } from '../data/company'
import { Instagram, Linkedin, Youtube } from './social'

const YEAR = new Date().getFullYear()

const SERVICE_LINKS = [
  ['AI Integrations', '/services#ai-integration'],
  ['Automated Workflows', '/services#automation'],
  ['App Development', '/services#apps'],
  ['Custom Websites', '/services#websites'],
  ['Custom Software & AI', '/services#software'],
  ['Technology Consulting', '/services#consulting'],
  ['Oracle NetSuite ERP', '/services#netsuite'],
]
const PRODUCT_LINKS = [...PRODUCTS.map((p) => [p.name, `/products#${p.id}`]), ['All products', '/products']]
const COMPANY_LINKS = [
  ['About Us', '/about'], ['Why Us', '/why-us'], ['Industries', '/industries'], ['Technology', '/technology'],
  ['Careers', '/careers'], ['Balvirttechhub', '/careers#institute'], ['Insights', '/insights'], ['Gallery', '/gallery'], ['Contact', '/contact'],
]
const SOCIALS = [[Linkedin, SITE.social.linkedin, 'LinkedIn'], [Youtube, SITE.social.youtube, 'YouTube'], [Instagram, SITE.social.instagram, 'Instagram']]

const MUTED = 'text-[#b9bdf0]'

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-1.5 text-[#c9cdff] transition hover:text-[#fff]">
      <ArrowRight size={13} className="-ml-4 text-[#7be8ff] opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" aria-hidden="true" />
      <span className="transition-transform group-hover:translate-x-0.5">{children}</span>
    </Link>
  )
}

function Column({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#fff]">{title}</h3>
      <div className="mt-2 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#8b6cff] to-[#38bdf8]" />
      <ul className="mt-5 space-y-3 text-sm">
        {links.map(([label, to]) => <li key={label + to}><FooterLink to={to}>{label}</FooterLink></li>)}
      </ul>
    </nav>
  )
}

function ContactItem({ icon: Icon, label, children, href }) {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,.1)] text-[#7be8ff] transition group-hover:bg-[rgba(255,255,255,.18)]"><Icon size={18} /></span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa0d8]">{label}</span>
        <span className="block break-words text-sm text-[#e6e8ff]">{children}</span>
      </span>
    </>
  )
  return href
    ? <a href={href} className="group flex items-start gap-3" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
    : <div className="group flex items-start gap-3">{body}</div>
}

export default function Footer() {
  return (
    <footer className="relative mt-10 px-5">
      {/* call-to-action band that overlaps the footer */}
      <div className="relative z-10 mx-auto -mb-16 max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#6d4aff] via-[#4f6bff] to-[#2d8cf0] px-6 py-10 text-on-brand shadow-2xl shadow-violet/40 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[rgba(255,255,255,.2)] blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[rgba(255,255,255,.14)] blur-2xl" aria-hidden="true" />
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-4xl">Have a requirement? Let&rsquo;s talk.</h2>
            <p className="mt-2 max-w-xl text-[rgba(255,255,255,.88)]">Tell us what you want to build or fix. An experienced consultant will reply within 24 hours.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#fff] px-6 py-3 text-sm font-semibold text-violet shadow-lg transition hover:-translate-y-0.5">
              <MessageSquareText size={17} /> Contact us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.5)] bg-[rgba(255,255,255,.12)] px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-[rgba(255,255,255,.22)]">
              <Phone size={16} /> {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="relative -mx-5 overflow-hidden bg-gradient-to-b from-[#0e0f3a] via-[#15165f] to-[#0b1e5e] px-5 pb-8 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#fff 1.2px, transparent 1.2px)', backgroundSize: '28px 28px' }} aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-violet/40 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.35fr] lg:gap-10">
            {/* brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" aria-label="Balvirt home" className="inline-block rounded-xl bg-[#fff] px-3 py-2 shadow-lg">
                <img src="/images/logo1.png" alt="Balvirt" className="h-9 w-auto" />
              </Link>
              <p className={`mt-5 max-w-sm text-sm leading-relaxed ${MUTED}`}>
                AI integrations, automated workflows, custom software and Oracle NetSuite ERP consulting, plus our own products: Balsuite, Balfrevo and Layvora.
              </p>
              <div className="mt-6 flex gap-3">
                {SOCIALS.map(([I, href, label]) => (
                  <motion.a key={label} whileHover={{ y: -4 }} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.08)] text-[#e6e8ff] transition hover:border-transparent hover:bg-gradient-to-br hover:from-[#8b6cff] hover:to-[#38bdf8] hover:text-on-brand">
                    <I />
                  </motion.a>
                ))}
              </div>
            </div>

            <Column title="Services" links={SERVICE_LINKS} />
            <Column title="Products" links={PRODUCT_LINKS} />
            <Column title="Company" links={COMPANY_LINKS} />

            {/* contact */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#fff]">Get in touch</h3>
              <div className="mt-2 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#8b6cff] to-[#38bdf8]" />
              <div className="mt-5 space-y-4">
                <ContactItem icon={Phone} label="Call us" href={SITE.phoneHref}>{SITE.phone}</ContactItem>
                <ContactItem icon={Mail} label="Email us" href={`mailto:${SITE.email}`}>{SITE.email}</ContactItem>
                <ContactItem icon={MapPin} label="Visit us" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}>{SITE.address}</ContactItem>
              </div>
            </div>
          </div>

          {/* bottom bar (right padding keeps clear of the chat button) */}
          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[rgba(255,255,255,.14)] pt-6 text-xs sm:flex-row sm:items-center sm:pr-20">
            <p className={MUTED}>© {YEAR} Balvirt · AI, Software &amp; ERP Solutions · All rights reserved.</p>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.08)] px-4 py-2 font-medium text-[#e6e8ff] transition hover:bg-[rgba(255,255,255,.16)]">
              Back to top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
