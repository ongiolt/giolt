import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { THEMES } from "./data";

export const pages = sqliteTable("pages", {
	id: text("id").primaryKey().unique().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	avatarUrl: text("logo_url"),
	theme: text("theme", { enum: THEMES }).notNull().default("light"),
	products: int("products").references(() => products.id),
	public: int("public", { mode: "boolean" }).notNull().default(false),
});

export const products = sqliteTable("products", {
	id: int("id").primaryKey().unique().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	imageUrl: text("image_url"),
	price: int("price").notNull(),
	checkoutLink: text("checkout_link").notNull(),
});
