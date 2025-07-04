import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "turso",
	schema: "./src/schema.ts",
	dbCredentials: {
		url: "file:./.local.db",
	},
});
