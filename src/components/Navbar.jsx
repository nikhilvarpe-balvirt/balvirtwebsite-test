import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { NAV } from '../data/site'

function DesktopItem({ item, hover, setHover }) {
  const [open, setOpen] = useState(false)
  const link = (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        `relative flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors 2xl:px-3.5 ${isActive ? 'bg-[#fff] font-semibold text-violet shadow-md shadow-violet/15' : 'text-muted hover:text-ink'}`
      }
    >
      {() => (
        <>
          {hover === item.label && (
            <motion.span layoutId="nav-hover" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 -z-10 rounded-full bg-[#fff]/80 shadow-sm" />
          )}
          {item.label}
          {item.children && <ChevronDown size={13} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />}
        </>
      )}
    </NavLink>
  )
  const wrapProps = {
    onMouseEnter: () => { setHover(item.label); setOpen(true) },
    onMouseLeave: () => { setHover(null); setOpen(false) },
  }
  if (!item.children) return <div className="relative" {...wrapProps}>{link}</div>
  return (
    <div className="relative" {...wrapProps}>
      {link}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
          >
            <div className="relative max-h-[75vh] min-w-64 overflow-y-auto rounded-2xl border border-[rgba(40,36,110,.10)] bg-[#fff] p-2 shadow-2xl shadow-violet/20">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet to-blue-500" />
              {item.children.map((c, ci) => c.heading ? (
                <div key={c.heading} className={`px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-violet ${ci ? 'mt-2 border-t border-[rgba(40,36,110,.08)] pt-3' : 'pt-2'}`}>{c.heading}</div>
              ) : (
                <Link key={c[1]} to={c[1]} onClick={() => setOpen(false)} className="group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-muted transition hover:bg-violet/8 hover:text-violet">
                  {c[0]}
                  <ArrowUpRight size={14} className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [hover, setHover] = useState(null)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setMenu(false); setExpanded(null) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menu])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[60] bg-[#fff] transition-shadow duration-300 ${scrolled ? 'shadow-xl shadow-violet/15' : 'shadow-sm shadow-violet/5'}`}>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-violet via-blue-500 to-fuchsia-500" />
        <nav className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 ${scrolled ? 'py-2' : 'py-3.5'} transition-all duration-300`} aria-label="Primary">
          <Link to="/" className="shrink-0" aria-label="Balvirt home">
            <img src="/images/logo1.png" alt="Balvirt" className="h-9 w-auto sm:h-10" />
          </Link>
          <div className="hidden items-center gap-0.5 rounded-full border border-[rgba(40,36,110,.08)] bg-gradient-to-r from-violet/[0.06] to-blue-500/[0.06] p-1 xl:flex">
            {NAV.map((item) => <DesktopItem key={item.label} item={item} hover={hover} setHover={setHover} />)}
          </div>
          <div className="flex items-center gap-3 xl:w-28 xl:justify-end">
            <button onClick={() => setMenu((m) => !m)} aria-label="Toggle menu" aria-expanded={menu} className="rounded-full border border-[rgba(40,36,110,.15)] bg-[#fff] p-2.5 xl:hidden">
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <div className="h-px bg-gradient-to-r from-transparent via-violet/25 to-transparent" />
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 4%)' }} animate={{ opacity: 1, clipPath: 'circle(150% at 95% 4%)' }} exit={{ opacity: 0, clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bg px-6 pb-12 pt-24 xl:hidden"
          >
            <ul className="mx-auto max-w-md space-y-1">
              {NAV.map((item, i) => (
                <motion.li key={item.label} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.15 }}>
                  <div className="flex items-center justify-between border-b border-white/8">
                    <Link to={item.to} className="flex-1 py-3.5 font-display text-xl font-semibold">{item.label}</Link>
                    {item.children && (
                      <button onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="p-3 text-muted" aria-label={`Expand ${item.label}`}>
                        <ChevronDown className={`transition-transform ${expanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {expanded === item.label && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-3">
                        {item.children.map((c) => c.heading ? (
                          <li key={c.heading} className="pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-violet">{c.heading}</li>
                        ) : (
                          <li key={c[1]}><Link to={c[1]} className="block py-2.5 text-muted">{c[0]}</Link></li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
