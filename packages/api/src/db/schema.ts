import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { REGIONS } from "./data";

export const apps = sqliteTable("apps", {
	id: integer("id").primaryKey().unique(),
	userId: integer("user_id").notNull(),
	slug: text("slug").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const machines = sqliteTable("machines", {
	id: integer("id").primaryKey().unique(),
	appId: integer("app_id")
		.references(() => apps.id)
		.notNull(),
	region: text("region", { enum: REGIONS }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
