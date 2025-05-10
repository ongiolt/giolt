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
	site: "https://docs.giolt.com",

	integrations: [
		starlight({
			title: "Giolt Docs",
			favicon: "./src/assets/giolt-rounded.svg",
			logo: {
				light: "./src/assets/giolt-light.svg",
				dark: "./src/assets/giolt-dark.svg",
			},
			sidebar: [
				{
					label: "Hosting",
					autogenerate: { directory: "hosting" },
				},
				{
					label: "CLI",
					autogenerate: { directory: "cli" },
				},
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
