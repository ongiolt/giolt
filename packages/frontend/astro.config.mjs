// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	output: "static",

	server: {
		port: 3000,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [react()],
	adapter: cloudflare(),
});
