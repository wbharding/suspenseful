import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), cloudflare()],
  // strictPort so a stale server on 4000 fails loudly instead of silently moving to 4001.
  // The explicit IPv4 host matters: left to default, Vite binds [::1] only on this machine and
  // anything that resolves localhost to 127.0.0.1 gets connection refused.
  server: {
    host: '127.0.0.1',
    port: 4000,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4000,
    strictPort: true,
  },
})
