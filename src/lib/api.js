// The PHP handlers answer in JSON {success,message} or plain "success" / "error:<msg>".
// postForm() normalises all of them to { ok, message }.
const BASE = import.meta.env.VITE_API_BASE || ''

const CODES = {
  invalid_request: 'Invalid request. Please try again.',
}

export async function postForm(endpoint, formData) {
  formData.set('ajax', '1')
  try {
    const res = await fetch(`${BASE}/php/${endpoint}`, { method: 'POST', body: formData })
    const raw = (await res.text()).trim()
    try {
      const j = JSON.parse(raw)
      return { ok: !!j.success, message: j.message || (j.success ? 'Thank you! We will be in touch shortly.' : 'Something went wrong. Please try again.') }
    } catch { /* not JSON */ }
    if (CODES[raw]) return { ok: false, message: CODES[raw] }
    if (res.ok && /^success/i.test(raw)) {
      return { ok: true, message: raw.replace(/^success:?/i, '') || 'Thank you! We will be in touch shortly.' }
    }
    return { ok: false, message: raw.replace(/^error:?/i, '') || 'Something went wrong. Please try again.' }
  } catch {
    return { ok: false, message: 'Network error. Please check your connection and try again.' }
  }
}
