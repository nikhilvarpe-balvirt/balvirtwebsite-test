import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { postForm } from '../lib/api'
import { emailProps, messageProps, nameProps, phoneProps } from '../lib/rules'

const inputCls =
  'w-full rounded-xl border border-[rgba(40,36,110,.15)] bg-[#fff] px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-violet focus:ring-4 focus:ring-violet/15'

export function Field({ label, id, as = 'input', required, children, ...props }) {
  const Tag = as
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
        {label}{required && <span className="text-amber"> *</span>}
      </label>
      {Tag === 'select' ? (
        <select id={id} name={id} required={required} className={inputCls} {...props}>{children}</select>
      ) : (
        <Tag id={id} name={id} required={required} className={inputCls} {...props} />
      )}
    </div>
  )
}

/** Hidden anti-bot honeypot — the PHP handlers silently drop submissions that fill it. */
export function Honeypot() {
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
}

export function Status({ state }) {
  if (!state?.msg) return null
  const Ok = state.ok
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status"
      className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${Ok ? 'border-mint/30 bg-mint/10 text-mint' : 'border-red-400/30 bg-red-400/10 text-red-300'}`}
    >
      {Ok ? <CheckCircle2 size={17} className="mt-0.5 shrink-0" /> : <AlertCircle size={17} className="mt-0.5 shrink-0" />}
      {state.msg}
    </motion.p>
  )
}

export function SubmitButton({ busy, children }) {
  return (
    <button
      type="submit" disabled={busy}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-7 py-3 text-sm font-semibold text-on-brand shadow-[0_10px_30px_-8px_rgba(109,74,255,.55)] transition hover:shadow-[0_14px_40px_-8px_rgba(8,145,178,.55)] disabled:opacity-60"
    >
      {busy && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

/** Generic submit handler hook: validates via the browser, posts to PHP, tracks status. */
export function useSubmit(endpoint, { onSuccess, extra } = {}) {
  const [state, setState] = useState({ busy: false, msg: '', ok: true })
  const startedAt = useRef(0) // when the form was opened (the server rejects instant bot posts)
  useEffect(() => { startedAt.current = Date.now() }, [])
  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('elapsed', String(Date.now() - startedAt.current))
    extra?.(data)
    setState({ busy: true, msg: '', ok: true })
    const r = await postForm(endpoint, data)
    setState({ busy: false, msg: r.message, ok: r.ok })
    if (r.ok) { form.reset(); onSuccess?.() }
  }
  return { state, submit, reset: () => { startedAt.current = Date.now(); setState({ busy: false, msg: '', ok: true }) } }
}

export function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, onClose])
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-end justify-center bg-[#1a1d45]/40 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={`relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-8 ${wide ? 'max-w-2xl' : 'max-w-xl'}`}
          >
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-muted hover:text-white"><X size={16} /></button>
            <h2 className="pr-10 font-display text-2xl font-bold">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/**
 * Inquiry form used by Services and Industries pages.
 * Posts name, email, phone, message and `<field>[]` checkboxes to the PHP endpoint.
 */
export function InquiryModal({ open, onClose, title, intro, endpoint, field, options, preselected, source }) {
  const { state, submit, reset } = useSubmit(endpoint)
  useEffect(() => { if (open) reset() }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const [picked, setPicked] = useState([])
  useEffect(() => { if (open) setPicked(preselected ? [preselected] : []) }, [open, preselected])
  const toggle = (o) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]))

  return (
    <Modal open={open} onClose={onClose} title={title} wide>
      {intro && <p className="mt-2 text-sm text-muted">{intro}</p>}
      <form
        onSubmit={(e) => {
          if (!picked.length) { e.preventDefault(); return }
          submit(e)
        }}
        className="relative mt-6 space-y-4"
      >
        <Honeypot />
        {source && <input type="hidden" name="source" value={source} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" id="name" required autoComplete="name" placeholder="Jane Doe" {...nameProps} />
          <Field label="Email address" id="email" type="email" required autoComplete="email" placeholder="you@company.com" {...emailProps} />
        </div>
        <Field label="Phone number" id="phone" type="tel" autoComplete="tel" placeholder="+91 …" {...phoneProps} />
        <fieldset>
          <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Interested in <span className="text-amber">*</span> <span className="normal-case tracking-normal">(select one or more)</span></legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {options.map((o) => (
              <label key={o} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition ${picked.includes(o) ? 'border-cyan/70 bg-cyan/10 text-white' : 'border-white/10 bg-white/5 text-muted hover:border-white/25'}`}>
                <input type="checkbox" name={`${field}[]`} value={o} checked={picked.includes(o)} onChange={() => toggle(o)} className="accent-cyan" />
                {o}
              </label>
            ))}
          </div>
          {!picked.length && state.msg === '' && <p className="mt-1.5 text-xs text-muted">Pick at least one option to send your inquiry.</p>}
        </fieldset>
        <Field label="Project requirements" id="message" as="textarea" rows={4} required placeholder="Tell us about your goals, timeline and systems…" {...messageProps} />
        <Status state={state} />
        <div className="flex flex-wrap justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5">Cancel</button>
          <SubmitButton busy={state.busy}>Send inquiry</SubmitButton>
        </div>
      </form>
    </Modal>
  )
}
