// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import clerk from "@clerk/astro";
import tailwindcss from "@tailwindcss/vite";
import sonda from "sonda/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	output: "server",

	server: {
		port: 3000,
	},

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: import.meta.env.PROD
				? {
						"react-dom/server": "react-dom/server.edge",
					}
				: undefined,
		},
		build: {
			sourcemap: true,
		},
		clearScreen: false,
		server: {
			strictPort: true,
		},
	},

	integrations: [
		react(),
		clerk({
			enableEnvSchema: false,
		}),
		sonda(),
	],
	adapter: cloudflare({
		imageService: "compile",
		platformProxy: {
			enabled: true,
		},
	}),
});
