// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import clerk from "@clerk/astro";

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
	},

	integrations: [react(), clerk({
		enableEnvSchema: false
	})],
	adapter: cloudflare({
		imageService: "compile",
		platformProxy: {
			enabled: true
		}
	}),
});
