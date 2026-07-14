import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "CTIF 2026 Šumperk",
        short_name: "CTIF 2026",
        description: "Live-Ergebnisse & Zeitplan CTIF 2026",
        theme_color: "#0E2A47",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/docs\.google\.com\/.*$/,
            handler: "NetworkFirst",
            options: { cacheName: "sheets-cache", networkTimeoutSeconds: 6,
              expiration: { maxEntries: 30, maxAgeSeconds: 3600 } }
          }
        ]
      }
    })
  ]
});
