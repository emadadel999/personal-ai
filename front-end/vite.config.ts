import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "P-Ai",
        name: "Personal AI",
        id: "/",
        lang: "en",
        scope: "/",
        theme_color: "#424242",
        background_color: "#1a1a1a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "images/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "images/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "images/web-app-manifest-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "images/screenshots/home.png",
            sizes: "963x539",
            type: "image/png",
            form_factor: "wide",
            label: "Chat screen",
          },
          {
            src: "images/screenshots/home.png",
            sizes: "963x539",
            type: "image/png",
            platform: "ios",
            label: "Chat screen",
          },
          {
            src: "images/screenshots/home.png",
            sizes: "963x539",
            type: "image/png",
            platform: 'android',
            label: "Chat screen",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
