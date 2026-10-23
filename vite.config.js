import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In dev, forward /php/* to a local PHP server:  php -S localhost:8000 -t ../balvirtwebsite
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/php': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
})
