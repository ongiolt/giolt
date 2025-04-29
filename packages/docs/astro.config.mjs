// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	output: "static",

	server: {
		port: 3000,
	},

	integrations: [
		starlight({
			title: "Giolt Docs",
			sidebar: [
				{
					label: "About",
					autogenerate: { directory: "about" },
				},
			],
			customCss: ["./src/styles/custom.css"],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
