import { beforeAll, expect, test } from "bun:test";
import { pages } from "@/db/schema";
import { $ } from "bun";
import { drizzle } from "drizzle-orm/libsql";

beforeAll(async () => {
	await $`bun seed`.text();
});

const db = drizzle("file:./.local.db");

test("Pages table select", async () => {
	const res = await db.select().from(pages).all();

	expect(res).toBeArray();
	expect(res.length).toBe(5);
});

test("Pages table cols", async () => {
	const full = await db.select().from(pages).all();
	const res = full[0];
});
