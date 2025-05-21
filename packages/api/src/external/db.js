import { Error as Err, Ok } from "../../build/dev/javascript/prelude.mjs";

/**
 * @param {Env} env
 * @returns DB
 */
export function get_db(env) {
	return env.get("DB");
}

/**
 * @param {DB} db
 * @param {String} sql
 * @returns Statement
 */
export function prepare_statement(db, sql) {
	return db.prepare(sql);
}

/**
 * @param {Statement} statement
 * @param {Array<String>} params
 * @returns Statement
 */
export function bind_params(statement, params) {
	return statement.bind(params);
}

/**
 * @param {Promise<Statement>} statement
 */
export function run_statement(statement) {
	return statement
		.run()
		.then((res) => new Ok(JSON.stringify(res)))
		.catch((err) => {
			return new Err(err);
		});
}
