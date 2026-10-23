import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/** Fullscreen image viewer. `images` is a list of URLs, `index` the open one (null = closed). */
export default function Lightbox({ images, index, onChange, onClose }) {
  const open = index !== null && index !== undefined
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, index, images.length, onChange, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 text-[#fff] backdrop-blur" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
          <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 rounded-full bg-[rgba(255,255,255,.14)] p-3 hover:bg-[rgba(255,255,255,.28)]"><X /></button>
          <button onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length) }} aria-label="Previous image" className="absolute left-3 rounded-full bg-[rgba(255,255,255,.14)] p-3 hover:bg-[rgba(255,255,255,.28)] sm:left-6"><ChevronLeft /></button>
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]} src={images[index]} alt={`Gallery image ${index + 1} of ${images.length}`}
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}
              className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>
          <button onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length) }} aria-label="Next image" className="absolute right-3 rounded-full bg-[rgba(255,255,255,.14)] p-3 hover:bg-[rgba(255,255,255,.28)] sm:right-6"><ChevronRight /></button>
          <div className="absolute bottom-5 rounded-full bg-[rgba(255,255,255,.14)] px-4 py-1.5 text-sm">{index + 1} / {images.length}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
