import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Reveal } from './ui'

/** FAQPage structured data for a list of [question, answer] pairs. */
export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

/** Accordion of [question, answer] pairs. */
export default function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {items.map(([q, a], i) => (
        <Reveal key={q} delay={i * 0.05}>
          <div className={`glass rounded-2xl transition ${open === i ? 'border-cyan/40' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold sm:text-lg">
              {q}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-cyan"><Plus size={20} /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-muted">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
