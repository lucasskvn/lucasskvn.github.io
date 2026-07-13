import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import { copyFileSync } from 'fs'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/ppgithub.png', 'assets/placeholder.jpg'],
      manifest: {
        name: 'lucasskvn — Portfolio',
        short_name: 'lucasskvn',
        description: 'Portfolio de Lucas Sangkhavongs — développeur, projets, musique',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b0f14',
        theme_color: '#a259ff',
        icons: [
          { src: '/assets/ppgithub.png', sizes: '192x192', type: 'image/png' },
          { src: '/assets/ppgithub.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MB for large assets
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/(?:ws\.audioscrobbler\.com|corsproxy\.io\/.*ws\.audioscrobbler\.com)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'lastfm-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
})
