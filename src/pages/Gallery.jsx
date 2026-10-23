import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Images, Maximize2, PartyPopper } from 'lucide-react'
import Seo from '../components/Seo'
import PhotoViewer from '../components/PhotoViewer'
import { PageHero } from '../components/ui'
import { GALLERY, TOTAL_PHOTOS } from '../data/gallery'

const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' } }

function AlbumCard({ album, index, onOpen, className = '' }) {
  return (
    <motion.button
      {...fade} transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      onClick={() => onOpen(album.id)}
      aria-label={`Open ${album.name} album, ${album.photos.length} photos`}
      className={`group relative isolate block overflow-hidden rounded-[1.75rem] border border-[rgba(40,36,110,.10)] text-left shadow-xl shadow-violet/20 focus-visible:outline-2 focus-visible:outline-[#7be8ff] ${className}`}
    >
      <img src={album.cover.lg} alt={`${album.name} album cover`} width={album.cover.w} height={album.cover.h} loading={index < 2 ? 'eager' : 'lazy'} className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-[900ms] group-hover:scale-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07081f] via-[#07081f]/45 to-transparent transition group-hover:from-[#07081f]/90" />
      <span className="absolute left-5 top-5 rounded-full bg-[#12134a]/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#fff] backdrop-blur">{album.tag}</span>
      <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#fff] px-3 py-1 text-xs font-semibold text-[#2b2380]"><Images size={13} /> {album.photos.length}</span>
      <div className="flex h-full flex-col justify-end p-6 sm:p-7">
        <h3 className={`font-display font-bold leading-tight text-[#fff] ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>{album.name}</h3>
        <p className={`mt-2 max-w-md text-[#d6d9ff] ${index === 0 ? 'text-base' : 'text-sm'}`}>{album.line}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7be8ff]">View album <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" /></span>
      </div>
    </motion.button>
  )
}

// First card is featured (wide + tall); the rest sit three per row. A short last row is stretched to fill.
function spanFor(i, n) {
  if (i === 0) return 'min-h-[22rem] md:col-span-2 lg:col-span-4 lg:h-[27rem]'
  if (i === 1) return 'min-h-[22rem] lg:col-span-2 lg:h-[27rem]'
  const rest = n - 2
  const left = rest % 3
  const inLast = i >= n - left
  const span = left === 1 && inLast ? 'lg:col-span-6' : left === 2 && inLast ? 'lg:col-span-3' : 'lg:col-span-2'
  return `min-h-[19rem] lg:h-[19rem] ${span}`
}

function Overview({ onOpen }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
      {GALLERY.map((a, i) => (
        <AlbumCard key={a.id} album={a} index={i} onOpen={onOpen} className={spanFor(i, GALLERY.length)} />
      ))}
    </div>
  )
}

function AlbumView({ album, onBack, onOpen, onPhoto }) {
  return (
    <div>
      <button onClick={onBack} className="group inline-flex items-center gap-2 rounded-full border border-[rgba(40,36,110,.15)] bg-[#fff] px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-violet/50 hover:text-violet">
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> All albums
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="rounded-full bg-violet/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet">{album.tag} · {album.photos.length} photos</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-5xl">{album.name}</h2>
        </div>
        <p className="text-base leading-relaxed text-muted">{album.desc}</p>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Albums">
        {GALLERY.map((a) => (
          <button key={a.id} role="tab" aria-selected={a.id === album.id} onClick={() => onOpen(a.id)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${a.id === album.id ? 'bg-gradient-to-r from-[#8b6cff] to-[#38bdf8] text-[#fff] shadow-lg shadow-violet/30' : 'border border-[rgba(40,36,110,.15)] bg-[#fff] text-muted hover:border-violet/50 hover:text-violet'}`}>{a.name}</button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {album.photos.map((p, i) => (
          <motion.button
            key={p.sm} {...fade} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            onClick={() => onPhoto(i)} aria-label={`Open photo ${i + 1} of ${album.photos.length}`}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-[rgba(40,36,110,.10)] bg-[#fff] shadow-md shadow-violet/10 sm:mb-4"
          >
            <img src={p.sm} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-auto w-full transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-[#07081f]/70 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff] text-[#2b2380]"><Maximize2 size={16} /></span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default function Gallery() {
  const [params, setParams] = useSearchParams()
  const [photo, setPhoto] = useState(null)
  const top = useRef(null)

  const album = GALLERY.find((a) => String(a.id) === params.get('album')) || null
  const open = (id) => { setPhoto(null); setParams({ album: String(id) }) }
  const back = () => { setPhoto(null); setParams({}) }

  // bring the album/overview into view when it changes
  useEffect(() => {
    if (!top.current) return
    const y = top.current.getBoundingClientRect().top + window.scrollY - 96
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' })
  }, [album?.id])

  return (
    <>
      <Seo
        path="/gallery"
        title={album ? `${album.name} Photos | Balvirt Gallery` : 'Photo Gallery | Life at Balvirt: Events & Team Culture'}
        description="Photos from life at Balvirt: team outings, inauguration, Sports Day, Ganesh Festival, Diwali, Dussehra and our 4th Foundation Day."
      />
      <PageHero eyebrow="Photo gallery" title="Life at" highlight="Balvirt" subtitle="Celebrations, milestones and everyday team spirit. A look at the people and moments that make Balvirt a great place to work.">
        {[[PartyPopper, `${GALLERY.length} events`], [Images, `${TOTAL_PHOTOS} photos`]].map(([I, t]) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full border border-[rgba(40,36,110,.15)] bg-[#fff] px-4 py-2 text-sm font-medium text-ink shadow-sm"><I size={16} className="text-violet" /> {t}</span>
        ))}
      </PageHero>

      <div>
        {/* content */}
        <section ref={top} className="relative mx-auto max-w-7xl px-5 pb-24 pt-2 sm:pb-28">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={album ? album.id : 'overview'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {album ? <AlbumView album={album} onBack={back} onOpen={open} onPhoto={setPhoto} /> : <Overview onOpen={open} />}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      {album && <PhotoViewer photos={album.photos} index={photo} title={album.name} onChange={setPhoto} onClose={() => setPhoto(null)} />}
    </>
  )
}
