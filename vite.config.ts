import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ci === 'true' ? '/Powerboard' : '',
  plugins: [react(), VitePWA()],
  server: {
    port: 4321
  }
})
