import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

import { copyFileSync } from "fs";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "og.png", "CV_LucasSangkhavongs.pdf"],
      manifest: {
        name: "INTERVALLE — Lucas Sangkhavongs",
        short_name: "INTERVALLE",
        description: "Un espace personnel pour le code et le reste.",
        start_url: "/",
        display: "standalone",
        background_color: "#141412",
        theme_color: "#141412",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,svg,png,jpg,jpeg,webp,gif,woff2,pdf}",
        ],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MB for large assets
        // Listening status stays live; failed requests must not look like a current track.
        runtimeCaching: [],
      },
    }),
  ],
});
