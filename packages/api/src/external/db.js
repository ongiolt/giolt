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
	return statement.run();
}
