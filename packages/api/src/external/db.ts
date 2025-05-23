import { Error as Err, Ok, type Result } from "@gleam/api/gleam.mjs";
import type { Database$, Statement$ } from "@gleam/api/lib/database.mjs";
import type { Env } from "@gleam/api/lib/env.mjs";

export function get_db(env: Readonly<Env>): Database$ {
	return env.get("DB");
}

export function prepare_statement(
	db: Readonly<Database$>,
	sql: Readonly<string>,
): Promise<Statement$> {
	return db.prepare(sql);
}

export function bind_params(
	statement: Readonly<Statement$>,
	params: Readonly<Map<string, string>>,
): Promise<Statement$> {
	return statement.bind(params);
}

export async function run_statement(
	statement: Readonly<Statement$>,
): Promise<Result<string, string>> {
	return statement
		.run()
		.then((res: unknown) => new Ok(JSON.stringify(res)))
		.catch((err: string) => {
			return new Err(err);
		});
}
