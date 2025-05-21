import { method_to_string } from "../../gleam_http/gleam/http";
import { Ok } from "../../prelude.d.mts";

/**
 * @param {String} path
 * @param {String} method
 * @returns Request
 */
export function mock_request(path, method) {
	return new Request(`http://localhost:3000${path}`, {
		method: method_to_string(method),
	});
}

/**
 * @returns DB
 */
export function create_mock_db() {
	return {
		prepare: (_sql) => ({
			bind: (_params) => ({
				run: async () => new Ok({}),
			}),
		}),
	};
}
