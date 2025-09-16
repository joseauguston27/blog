import type { VitePWAOptions } from 'vite-plugin-pwa';

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'prompt' as const,
  injectRegister: 'auto',
  minify: true,
  includeManifestIcons: true,
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.js',
  manifest: {
  
    name: "Jose's Blog",
    short_name: "Jose's Blog",
    description: "Personal blog of Jose - A 14-year-old math enthusiast",
    theme_color: "#4f46e5",
    background_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  },
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
  },
};

export default pwaConfig;
