import { CURRENCIES, PAGE_TYPES, THEMES } from "@/lib/data.ts";
import { drizzle } from "drizzle-orm/libsql";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

interface Refine {
	pages: {
		columns: Partial<
			// biome-ignore lint/suspicious/noExplicitAny: This is ok to be any as we need the generators
			Record<keyof typeof schema.pages.$inferSelect, any>
		>;
		count: number;
	};
	products: {
		columns: Partial<
			// biome-ignore lint/suspicious/noExplicitAny: This is ok to be any as we need the generators
			Record<keyof typeof schema.products.$inferSelect, any>
		>;
		count: number;
	};
}

async function main() {
	const db = drizzle("file:./.local.db");
	await seed(db, schema).refine(
		(f) =>
			({
				pages: {
					columns: {
						id: f.string({ isUnique: true }),
						type: f.valuesFromArray({
							values: PAGE_TYPES as unknown as string[],
						}),
						name: f.companyName(),
						description: f.loremIpsum({ sentencesCount: 5 }),
						content: f.loremIpsum({ sentencesCount: 10 }),
						logoId: f.string(),
						coverId: f.string(),
						location: f.streetAddress(),
						theme: f.valuesFromArray({
							values: THEMES as unknown as string[],
						}),
						public: f.boolean(),
					},
					count: 5,
				},
				products: {
					columns: {
						id: f.intPrimaryKey(),
						checkoutLink: f.string(),
						description: f.loremIpsum({ sentencesCount: 5 }),
						imageId: f.string(),
						name: f.firstName(),
						price: f.int({ minValue: 1, maxValue: 100 }),
						priceCurrency: f.valuesFromArray({
							values: CURRENCIES as unknown as string[],
						}),
					},
					count: 5 * 5, // 5 pages * 5 products per page
				},
			}) satisfies Refine,
	);
}

main();
