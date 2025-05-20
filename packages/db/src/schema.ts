import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { REGIONS } from "./data";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().unique(),
	customerId: integer("customer_id").notNull(),
	subscriptionStatus: text("subscription_status", {
		enum: ["active", "inactive"],
	})
		.notNull()
		.default("inactive"),
});

export const apps = sqliteTable("apps", {
	id: integer("id").primaryKey().unique(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	slug: text("slug").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const machines = sqliteTable("machines", {
	id: integer("id").primaryKey().unique(),
	appId: integer("app_id").references(() => apps.id).notNull(),
	region: text("region", { enum: REGIONS }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});