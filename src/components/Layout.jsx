import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Chatbot from './Chatbot'

/** Scroll to top on route change, or to #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    // Images further down the page finish loading after the first jump and push the target away,
    // so keep checking for a few seconds and re-align until it sits where it should.
    const id = hash.slice(1)
    let timer, tries = 0, lastTop = null, userScrolled = false
    const stop = () => { userScrolled = true }
    const events = ['wheel', 'touchstart', 'keydown']
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }))
    const tick = () => {
      if (userScrolled || tries++ > 30) return
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top
        const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
        const settled = lastTop !== null && Math.abs(top - lastTop) < 1       // not moving any more
        if (Math.abs(top - offset) > 12 && (tries === 1 || settled)) {
          el.scrollIntoView({ behavior: tries === 1 ? 'smooth' : 'instant', block: 'start' })
        }
        lastTop = top
      }
      timer = setTimeout(tick, tries < 3 ? 250 : 150)
    }
    timer = setTimeout(tick, 120)
    return () => { clearTimeout(timer); events.forEach((e) => window.removeEventListener(e, stop)) }
  }, [pathname, hash])
  return null
}

/** Soft spotlight that follows the cursor (desktop pointers only). */
function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })
  const [fine] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: fine)').matches)
  useEffect(() => {
    if (!fine) return
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [fine, x, y])
  if (!fine) return null
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full bg-violet/15 blur-[90px]" />
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollManager />
      <CursorGlow />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="relative z-10">
        <Outlet />
      </motion.main>
      <Footer />
      <Chatbot />
    </>
  )
}
