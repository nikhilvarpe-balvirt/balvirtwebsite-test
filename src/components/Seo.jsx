import { useEffect } from 'react'
import { SITE } from '../data/site'

const OG_IMAGE = `${SITE.url}/images/og-share.jpg`

// Breadcrumb names per route (used for the BreadcrumbList structured data).
const CRUMBS = {
  '/about': 'About Us', '/services': 'Services', '/products': 'Products', '/industries': 'Industries',
  '/technology': 'Technology', '/why-us': 'Why Us', '/careers': 'Careers', '/insights': 'Insights',
  '/gallery': 'Gallery', '/contact': 'Contact',
}

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Per-page <title>, description, canonical, Open Graph / Twitter tags and JSON-LD.
 * The same tags are baked into the static HTML at build time (scripts/prerender.mjs),
 * so crawlers and link previews see them without running JavaScript.
 */
export default function Seo({ title, description, path = '/', jsonLd, noindex = false }) {
  useEffect(() => {
    const url = SITE.url + (path === '/' ? '/' : path)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:locale', 'en_IN')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', 'Balvirt: AI, software and NetSuite ERP consulting')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', OG_IMAGE)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url

    // structured data: page-specific data plus a breadcrumb trail
    document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove())
    const blocks = []
    if (jsonLd) blocks.push(jsonLd)
    if (CRUMBS[path]) {
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
          { '@type': 'ListItem', position: 2, name: CRUMBS[path], item: url },
        ],
      })
    }
    const nodes = blocks.map((b) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seo = '1'
      s.textContent = JSON.stringify(b)
      document.head.appendChild(s)
      return s
    })
    return () => nodes.forEach((n) => n.remove())
  }, [title, description, path, jsonLd, noindex])
  return null
}
