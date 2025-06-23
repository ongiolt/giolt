import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { PAGE_TYPES, THEMES } from "./data";
import { seed } from "drizzle-seed";

interface Refine {
	pages: {
		columns: Partial<Record<keyof typeof schema.pages.$inferSelect, any>>
		count: number
	},
	products: {
		columns: Partial<Record<keyof typeof schema.products.$inferSelect, any>>,
		count: number
	}
}

async function main() {
	const db = drizzle("file:./.local.db");
	await seed(db, schema).refine((f) => ({
		pages: {
			columns: {
				id: f.string({ isUnique: true }),
				type: f.valuesFromArray({ values: PAGE_TYPES as unknown as string[] }),
				name: f.companyName(),
				description: f.loremIpsum(),
				content: f.loremIpsum(),
				logoId: f.string(),
				coverId: f.string(),
				theme: f.valuesFromArray({ values: THEMES as unknown as string[] }),
				public: f.boolean()
			},
			count: 5
		},
		products: {
			columns: {
				id: f.intPrimaryKey(),
				checkoutLink: f.string(),
				description: f.loremIpsum(),
				imageId: f.string(),
				name: f.firstName(),
				price: f.int({ minValue: 1, maxValue: 100 })
			},
			count: 5
		}
	} satisfies Refine))
}

main();
