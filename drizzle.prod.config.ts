import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "turso",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: This should be defined in the environment
		url: process.env.TURSO_DATABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: This should be defined in the environment
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
