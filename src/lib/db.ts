import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
	connection: {
		url: import.meta.env.TURSO_DATABASE_URL ?? "file:../.local.db",
		authToken: import.meta.env.TURSO_AUTH_TOKEN,
	},
});
