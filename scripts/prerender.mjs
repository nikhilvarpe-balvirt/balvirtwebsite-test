// Post-build step: renders every route in headless Chrome and saves the finished HTML,
// so search engines, social-media link previews and AI crawlers get real titles,
// descriptions and page text without having to run JavaScript.
//
//   npm run build        -> vite build + this script
//   npm run build:fast   -> vite build only (no HTML snapshots)
//
// Needs Google Chrome / Edge / Chromium. Set CHROME_PATH if it is installed somewhere unusual.
// If no browser is found the build still succeeds, only without the snapshots.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SITE = 'https://balvirt.com'
const PORT = 4199

const ROUTES = [
  { url: '/', priority: '1.0', freq: 'weekly' },
  { url: '/services', priority: '0.9', freq: 'monthly' },
  { url: '/products', priority: '0.9', freq: 'monthly' },
  { url: '/industries', priority: '0.8', freq: 'monthly' },
  { url: '/technology', priority: '0.8', freq: 'monthly' },
  { url: '/why-us', priority: '0.7', freq: 'monthly' },
  { url: '/about', priority: '0.7', freq: 'monthly' },
  { url: '/careers', priority: '0.7', freq: 'weekly' },
  { url: '/insights', priority: '0.6', freq: 'monthly' },
  { url: '/gallery', priority: '0.6', freq: 'monthly' },
  { url: '/contact', priority: '0.8', freq: 'yearly' },
]

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean)
  return candidates.find((p) => fs.existsSync(p))
}

// tiny static server for dist/ (unknown paths fall back to index.html so React can render the 404 page)
function serve() {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain' }
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const clean = decodeURIComponent(req.url.split('?')[0])
      let file = path.join(DIST, clean)
      if (!file.startsWith(DIST)) { res.writeHead(403); return res.end() }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
      if (!fs.existsSync(file)) file = path.join(DIST, 'index.html')
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
      fs.createReadStream(file).pipe(res)
    }).listen(PORT, () => resolve(server))
  })
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) throw new Error('dist/index.html not found. Run vite build first.')
  const chrome = findChrome()
  const today = new Date().toISOString().slice(0, 10)

  // sitemap (always written)
  const urls = ROUTES.map((r) => `  <url>\n    <loc>${SITE}${r.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`).join('\n')
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  console.log('prerender: sitemap.xml written (' + ROUTES.length + ' pages, lastmod ' + today + ')')

  if (!chrome) {
    console.warn('prerender: no Chrome/Edge found, skipping HTML snapshots. Set CHROME_PATH to enable them.')
    return
  }
  const server = await serve()
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new' })
  try {
    const targets = [...ROUTES.map((r) => ({ url: r.url, out: r.url === '/' ? 'index.html' : `${r.url.slice(1)}/index.html` })), { url: '/__not-found', out: '404.html', notFound: true }]
    for (const t of targets) {
      const page = await browser.newPage()
      await page.setViewport({ width: 1366, height: 900 })
      await page.goto(`http://localhost:${PORT}${t.url}`, { waitUntil: 'networkidle0' })
      await page.waitForSelector('main h1', { timeout: 15000 })
      await page.evaluate(() => new Promise((r) => setTimeout(r, 600))) // let the Seo effect + entrance animations settle
      // make the snapshot show everything: scroll-reveal sections start hidden until scrolled into view
      await page.evaluate(() => {
        document.querySelectorAll('main [style*="opacity: 0"]').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
      })
      let html = await page.content()
      html = html.replace(/<!DOCTYPE html>/i, '<!doctype html>')
      const file = path.join(DIST, t.out)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, html)
      const title = await page.title()
      console.log(`prerender: ${t.out.padEnd(26)} ${(html.length / 1024).toFixed(0).padStart(4)} KB  "${title}"`)
      await page.close()
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((e) => { console.error('prerender failed:', e.message); process.exit(1) })
