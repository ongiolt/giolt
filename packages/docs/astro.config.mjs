// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import starlightOpenAPIPlugin, { openAPISidebarGroups } from "starlight-openapi";

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
			plugins: [
				starlightOpenAPIPlugin([
					{
						sidebar: {
							label: "API",
							collapsed: true,
						},
						base: "/openapi",
						schema: "https://api.giolt.com/openapi.json"
					}
				])
			],
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
				...openAPISidebarGroups
			],
			customCss: ["./src/styles/custom.css"],
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
