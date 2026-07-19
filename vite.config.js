import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Logo.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Luc Pellinger — Portfolio',
        short_name: 'Luc Pellinger',
        description: 'Personal website and portfolio of Luc Pellinger',
        start_url: '/',
        display: 'standalone',
        background_color: '#392A48',
        theme_color: '#392A48',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,jpeg,ico}'],
        // Don't precache the resume PDF; it's fetched on demand
        globIgnores: ['**/Resume_*.pdf'],
      },
    }),
  ],
})
