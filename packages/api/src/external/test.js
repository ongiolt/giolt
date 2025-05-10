import { method_to_string } from "../../gleam_http/gleam/http";

/**
 *
 * @param {String} path
 * @param {String} method
 * @returns
 */
export function mock_request(path, method) {
	return new Request(`http://localhost:3000${path}`, {
		method: method_to_string(method),
	});
}
