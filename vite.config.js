import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deploy under a sub-path (e.g. GitHub Pages) with:  VITE_BASE=/balvirtwebsite-test/ npm run build:fast
const base = process.env.VITE_BASE || '/'

// Prefixes root-absolute asset paths ("/images/..") in source with the base at build time.
const prefixAssets = {
  name: 'prefix-asset-paths',
  enforce: 'pre',
  transform(code, id) {
    if (base === '/' || !/[\\/]src[\\/].*\.(jsx?|json)$/.test(id)) return null
    return code.replace(/(["'`(])\/(images\/|favicon\.svg|icons\.svg)/g, `$1${base}$2`)
  },
}

// In dev, forward /php/* to a local PHP server:  php -S localhost:8000 -t ../balvirtwebsite
export default defineConfig({
  base,
  plugins: [prefixAssets, react(), tailwindcss()],
  server: {
    proxy: {
      '/php': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
})
