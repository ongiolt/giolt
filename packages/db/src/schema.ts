import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { PAGE_TYPES, THEMES } from "giolt-shared/data.ts";

export const pages = sqliteTable("pages", {
	id: text("id").primaryKey().unique().notNull(),
	type: text("type", { enum: PAGE_TYPES }).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	content: text("content"),
	logoId: text("logo_id"),
	coverId: text("cover_id"),
	theme: text("theme", { enum: THEMES }).notNull(),
	products: int("products").references(() => products.id),
	public: int("public", { mode: "boolean" }).notNull().default(false),
});

export type SelectPages = typeof pages.$inferSelect;

export const products = sqliteTable("products", {
	id: int("id").primaryKey().unique().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	imageId: text("image_id"),
	price: int("price").notNull(),
	checkoutLink: text("checkout_link").notNull(),
});
