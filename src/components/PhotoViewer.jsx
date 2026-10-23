import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Full-screen photo viewer: arrows, keyboard, swipe, thumbnail strip, caption and counter.
 * photos: [{ lg, sm, alt }]   index: open photo (null = closed)
 */
export default function PhotoViewer({ photos, index, title, onChange, onClose }) {
  const open = index !== null && index !== undefined
  const strip = useRef(null)
  const count = photos.length
  const go = (d) => onChange((index + d + count) % count)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }) // eslint-disable-line react-hooks/exhaustive-deps

  // keep the active thumbnail in view and preload the neighbours
  useEffect(() => {
    if (!open) return
    strip.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
    ;[1, -1].forEach((d) => { const i = new Image(); i.src = photos[(index + d + count) % count].lg })
  }, [open, index, photos, count])

  const btn = 'flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,255,255,.14)] text-[#fff] backdrop-blur transition hover:bg-[rgba(255,255,255,.28)] focus-visible:outline-2 focus-visible:outline-[#7be8ff]'

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col bg-[#07081f]/95 text-[#fff] backdrop-blur-md"
          role="dialog" aria-modal="true" aria-label={`${title} photo viewer`}
        >
          {/* top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <div className="truncate font-display text-base font-semibold sm:text-lg">{title}</div>
              <div className="text-xs text-[#b9bdf0]">Photo {index + 1} of {count}</div>
            </div>
            <button onClick={onClose} aria-label="Close viewer" className={btn}><X size={20} /></button>
          </div>

          {/* stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={onClose}>
            <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous photo" className={`${btn} absolute left-2 z-10 sm:left-5`}><ChevronLeft /></button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={photos[index].lg}
                src={photos[index].lg}
                alt={photos[index].alt}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.22 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35}
                onDragEnd={(_, info) => { if (info.offset.x < -70) go(1); else if (info.offset.x > 70) go(-1) }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full cursor-grab touch-pan-y select-none rounded-xl object-contain shadow-2xl shadow-black/60 active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>
            <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next photo" className={`${btn} absolute right-2 z-10 sm:right-5`}><ChevronRight /></button>
          </div>

          {/* thumbnails */}
          <div ref={strip} className="flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6" role="tablist" aria-label="Photo thumbnails">
            {photos.map((p, i) => (
              <button
                key={p.sm} role="tab" aria-selected={i === index} aria-current={i === index ? 'true' : undefined} aria-label={`Show photo ${i + 1}`}
                onClick={() => onChange(i)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-24 ${i === index ? 'border-[#7be8ff] opacity-100' : 'border-transparent opacity-50 hover:opacity-90'}`}
              >
                <img src={p.sm} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
