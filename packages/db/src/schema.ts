import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().unique(),
	customerId: integer("customer_id").notNull(),
	subscriptionStatus: text("subscription_status", { enum: ["active", "inactive"] }).notNull().default("inactive")
})