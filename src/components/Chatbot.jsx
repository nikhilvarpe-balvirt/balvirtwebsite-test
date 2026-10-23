import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Bot, ArrowLeft, SendHorizontal } from 'lucide-react'
import data from '../data/chatbot.json'

const SECTIONS = Object.entries(data).map(([key, v]) => ({ key, ...v }))

function Typing() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-cyan" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }} />
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState(null)
  const [messages, setMessages] = useState([
    { from: 'bot', html: "Hello! 👋 I'm the Balvirt Assistant. Pick a category below to explore our services and solutions." },
  ])
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages, typing, section, open])

  const ask = (q) => {
    setMessages((m) => [...m, { from: 'user', html: q.question }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', html: q.answer }])
    }, 650)
  }

  const current = SECTIONS.find((s) => s.key === section)

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)} aria-label="Open chat assistant"
            className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan text-on-brand shadow-[0_10px_30px_-6px_rgba(109,74,255,.6)]"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-violet/40" />
            <MessageCircle className="relative" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog" aria-label="Balvirt chat assistant"
            initial={{ opacity: 0, y: 30, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-5 right-5 z-[80] flex h-[min(620px,calc(100dvh-2.5rem))] w-[min(390px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-violet/20"
          >
            <header className="flex items-center gap-3 bg-gradient-to-r from-violet/40 to-cyan/30 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Bot size={20} /></span>
              <div className="flex-1">
                <h2 className="font-display text-sm font-semibold">Danny Assistant</h2>
                <p className="flex items-center gap-1.5 text-xs text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> Online</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1.5 hover:bg-white/10"><X size={18} /></button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === 'user' ? 'rounded-br-md bg-gradient-to-r from-violet to-cyan text-on-brand' : 'rounded-bl-md border border-white/8 bg-white/5 text-ink'}`}
                    dangerouslySetInnerHTML={{ __html: m.html }}
                  />
                </motion.div>
              ))}
              {typing && <div className="inline-block rounded-2xl rounded-bl-md border border-white/8 bg-white/5 px-3"><Typing /></div>}
              <div ref={endRef} />
            </div>

            <div className="max-h-[42%] overflow-y-auto border-t border-white/8 bg-bg/60 p-3">
              {!current ? (
                <div className="flex flex-wrap gap-2">
                  {SECTIONS.map((s) => (
                    <button key={s.key} onClick={() => setSection(s.key)} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium transition hover:border-cyan hover:text-cyan">{s.title}</button>
                  ))}
                </div>
              ) : (
                <div>
                  <button onClick={() => setSection(null)} className="mb-2 flex items-center gap-1.5 text-xs font-medium text-cyan"><ArrowLeft size={13} /> {current.title} — all categories</button>
                  <div className="flex flex-col gap-1.5">
                    {current.questions.map((q) => (
                      <button key={q.question} onClick={() => ask(q)} className="flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-left text-xs transition hover:border-cyan/60 hover:bg-white/10">
                        <span>{q.question}</span><SendHorizontal size={13} className="shrink-0 text-cyan" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
