import { $ } from "bun";
import { pages } from "../src/schema";
import { test, expect, beforeAll } from "bun:test";
import { drizzle } from "drizzle-orm/libsql";

beforeAll(async () => {
	await $`bun seed`
})

const db = drizzle("file:./.local.db");

test("Pages table select", async () => {
	const res = await db.select().from(pages).all();

	expect(res).toBeArray();
	expect(res.length).toBe(5);
});

test("Pages table cols", async () => {
	const full = await db.select().from(pages).all();
	const res = full[0];
})
