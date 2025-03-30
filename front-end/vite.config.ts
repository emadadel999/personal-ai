import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			selfDestroying: true,
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			manifest: {
				short_name: 'P-Ai',
				name: 'Personal AI',
				description: 'A Community-based local personal AI',
				id: '/',
				scope: '/',
				start_url: '/',
				lang: 'en',
				theme_color: '#1a1a1a',
				background_color: '#2c2c2c',
				display: 'standalone',
        // orientation: "portrait",
				icons: [
          {
						src: 'pwa-144x144.png',
						sizes: '144x144',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
          {
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
	],
	build: {
		rollupOptions: {
			// https://rollupjs.org/configuration-options/
		},
	},
});
