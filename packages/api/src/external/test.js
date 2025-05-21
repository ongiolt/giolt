import { method_to_string } from "../../gleam_http/gleam/http";
import { Ok } from "../../prelude.mjs";

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
 * @returns Env
 */
export function create_mock_env() {
	return new Map([
		[
			"DB",
			{
				prepare: (_sql) => ({
					bind: (_params) => ({
						run: async () =>
							new Ok({
								success: true,
								results: [],
							})[0],
					}),
					run: async () =>
						new Ok({
							success: true,
							results: [],
						})[0],
				}),
			},
		],
	]);
}
