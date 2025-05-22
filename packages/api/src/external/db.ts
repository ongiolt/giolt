import type {
	DB$,
	Statement$,
} from "../../build/dev/javascript/api/lib/db.mjs";
import type { Env } from "../../build/dev/javascript/api/lib/env.mjs";
import {
	Error as Err,
	Ok,
	type Result,
} from "../../build/dev/javascript/prelude.mjs";

export function get_db(env: Env): DB$ {
	return env.get("DB");
}

export function prepare_statement(db: DB$, sql: string): Promise<Statement$> {
	return db.prepare(sql);
}

export function bind_params(
	statement: Statement$,
	params: Map<string, string>,
): Promise<Statement$> {
	return statement.bind(params);
}

export async function run_statement(
	statement: Statement$,
): Promise<Result<string, string>> {
	return statement
		.run()
		.then((res: unknown) => new Ok(JSON.stringify(res)))
		.catch((err: string) => {
			return new Err(err);
		});
}
