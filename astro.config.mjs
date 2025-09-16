// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { VitePWA } from 'vite-plugin-pwa';
import pwaConfig from './src/pwa-config';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
  ],
  vite: {
    plugins: [
      VitePWA({
        ...pwaConfig,
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,ico,webp,woff,woff2,ttf,eot,otf}'],
          runtimeCaching: [
            {
              urlPattern: /^https?:\/\/.*\.(png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot|otf)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets',
                expiration: {
                  maxEntries: 1000,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https?:\/\/.*\.(json|xml)$/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'data',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ]
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
