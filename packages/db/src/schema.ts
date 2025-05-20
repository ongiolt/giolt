import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
	name: text("name").notNull(),
	machines: text("machines", { mode: "json" }).notNull().default("[]"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
