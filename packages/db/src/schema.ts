import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { THEMES } from "./data";

export const pages = sqliteTable("pages", {
	id: text("id").primaryKey().unique().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	avatarUrl: text("logo_url"),
	theme: text("theme", { enum: THEMES }).notNull().default("light"),
});
