import { CURRENCIES, PAGE_TYPES, THEMES } from "@/lib/data.ts";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
	id: text("id").primaryKey().unique().notNull(),
	type: text("type", { enum: PAGE_TYPES }).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	content: text("content"),
	logoId: text("logo_id"),
	coverId: text("cover_id"),
	theme: text("theme", { enum: THEMES }).notNull(),
	public: int("public", { mode: "boolean" }).notNull().default(false),
});

export type SelectPages = typeof pages.$inferSelect;

export const products = sqliteTable("products", {
	id: int("id").primaryKey().unique().notNull(),
	pageId: text("page_id")
		.references(() => pages.id)
		.notNull(),
	name: text("name").notNull(),
	description: text("description"),
	imageId: text("image_id"),
	price: int("price").notNull(),
	priceCurrency: text("price_currency", { enum: CURRENCIES }).notNull(),
	checkoutLink: text("checkout_link").notNull(),
});
