import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Rocket, Code2, Gauge, Workflow, LifeBuoy, DatabaseZap, Layers, Factory, Store, Truck,
  Car, ShoppingCart, ArrowRight, Check, Star, Sparkles, Bot, Compass, Lightbulb, Users, GraduationCap, Egg, Globe,
  Smartphone, Monitor, BarChart3, ShieldCheck,
} from 'lucide-react'
import { SITE } from '../data/site'

const ICONS = { Bot, Compass, Lightbulb, Users, GraduationCap, Egg, Globe, Smartphone, Monitor, BarChart3, ShieldCheck, Rocket, Code2, Gauge, Workflow, LifeBuoy, DatabaseZap, Layers, Factory, Store, Truck, Car, ShoppingCart, Check, Star, Sparkles }
export function Icon({ name, ...props }) {
  const C = ICONS[name] || Sparkles
  return <C {...props} />
}

/** Fade + rise on scroll. */
export function Reveal({ children, delay = 0, y = 28, className = '', as: Tag = 'div', ...rest }) {
  const M = motion[Tag] || motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Animated number that counts up when scrolled into view. */
export function Counter({ value, suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])
  return <span ref={ref}>{n}{suffix}</span>
}

export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-cyan sm:text-xs sm:tracking-[0.18em]">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]" />
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, highlight, subtitle, center = true, className = '' }) {
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  )
}

/** Primary / ghost button that renders a router Link, anchor or button, with a magnetic hover. */
export function Button({ to, href, variant = 'primary', children, icon = true, className = '', ...rest }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan'
  const styles = {
    primary:
      'bg-gradient-to-r from-violet to-cyan text-on-brand shadow-[0_10px_30px_-8px_rgba(109,74,255,.55)] hover:shadow-[0_14px_40px_-8px_rgba(8,145,178,.55)]',
    ghost: 'border border-white/15 bg-white/5 text-ink hover:border-cyan/60 hover:bg-white/10',
  }
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  )
  const props = {
    className: `${base} ${styles[variant]} ${className}`,
    style: { x: sx, y: sy },
    onMouseMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - r.left - r.width / 2) * 0.18)
      y.set((e.clientY - r.top - r.height / 2) * 0.28)
    },
    onMouseLeave: () => { x.set(0); y.set(0) },
    ...rest,
  }
  if (to) return <MotionLink to={to} {...props}>{content}</MotionLink>
  if (href) return <motion.a href={href} {...props}>{content}</motion.a>
  return <motion.button {...props}>{content}</motion.button>
}
const MotionLink = motion.create(Link)

/** Card that tilts toward the cursor and shows a soft spotlight. */
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
  const spot = useTransform([mx, my], ([a, b]) => `radial-gradient(420px circle at ${a * 100}% ${b * 100}%, rgba(124,92,255,.18), transparent 60%)`)
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5) }}
      className={`glass glow-border relative overflow-hidden rounded-3xl ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}

/** Hero banner used at the top of inner pages. */
export function PageHero({ eyebrow, title, highlight, subtitle, children }) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-32 sm:pt-36">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="aurora -left-24 top-0 -z-10 h-80 w-80 bg-violet" />
      <div className="aurora -right-16 top-24 -z-10 h-72 w-72 bg-cyan" style={{ animationDelay: '-6s' }} />
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-9 flex flex-wrap justify-center gap-4">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export function CTA({ title, highlight, text, primary = { label: 'Get a Free Consultation', to: '/contact' }, secondary }) {
  return (
    <section className="px-5 pb-24">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet/30 via-card to-cyan/20 p-10 text-center sm:p-16">
        <div className="aurora -left-10 -top-10 h-60 w-60 bg-violet" />
        <div className="aurora -bottom-16 -right-10 h-60 w-60 bg-cyan" />
        <div className="relative">
          <h2 className="text-3xl font-bold sm:text-5xl">{title} {highlight && <span className="text-gradient">{highlight}</span>}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button to={primary.to}>{primary.label}</Button>
            {secondary && <Button to={secondary.to} variant="ghost">{secondary.label}</Button>}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/**
 * Designed illustration panel used when an item has no photo/screenshot.
 * Shows a browser-style window with the icon, title and feature chips.
 */
export function Visual({ icon, title, chips = [], gradient = 'from-violet to-blue-500', image, alt }) {
  if (image) return <img src={image} alt={alt || title} loading="lazy" className="relative h-auto w-full rounded-[1.5rem]" />
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${gradient} p-5 text-on-brand sm:p-7`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[rgba(255,255,255,.2)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-[rgba(255,255,255,.14)] blur-2xl" />
      <div className="relative flex h-full flex-col rounded-2xl border border-[rgba(255,255,255,.28)] bg-[rgba(255,255,255,.12)] backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-[rgba(255,255,255,.2)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,.55)]" /><span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,.4)]" /><span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,.3)]" />
          <span className="ml-3 h-4 flex-1 rounded-full bg-[rgba(255,255,255,.18)]" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(255,255,255,.25)] shadow-lg sm:h-20 sm:w-20"><Icon name={icon} size={34} /></span>
          <div className="font-display text-xl font-bold sm:text-2xl">{title}</div>
          <div className="flex flex-wrap justify-center gap-2">
            {chips.slice(0, 3).map((c) => <span key={c} className="rounded-full bg-[rgba(255,255,255,.22)] px-3 py-1 text-[11px] font-medium sm:text-xs">{c}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Filler card for service grids: invites a conversation when nothing above fits exactly. */
export function ConsultCard() {
  return (
    <Link to="/contact" className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-violet to-blue-500 p-6 text-on-brand shadow-xl shadow-violet/25 transition hover:-translate-y-1">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[rgba(255,255,255,.18)] blur-2xl" />
      <Sparkles size={26} className="relative" />
      <div className="relative">
        <h3 className="text-xl font-semibold leading-snug">Not sure what you need?</h3>
        <p className="mt-2 text-sm text-[rgba(255,255,255,.85)]">Talk to an experienced consultant and get a clear plan within 24 hours.</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Free consultation <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}

export function BulletList({ items, columns = false }) {
  return (
    <ul className={columns ? 'grid gap-x-8 gap-y-3 sm:grid-cols-2' : 'space-y-3'}>
      {items.map((it, i) => {
        const [head, body] = Array.isArray(it) ? it : [it, null]
        return (
          <li key={i} className="flex gap-3">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan"><Check size={12} strokeWidth={3} /></span>
            <span className="text-sm leading-relaxed text-muted">
              {body ? <><strong className="font-semibold text-ink">{head}</strong> — {body}</> : head}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export { SITE }
