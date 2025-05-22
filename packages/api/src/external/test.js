import path from "node:path";
import dotenv from "dotenv";
import { method_to_string } from "../../gleam_http/gleam/http";
import { Ok } from "../../prelude.mjs";

export function mock_request(path, method, headers = new Map()) {
	const headersReq = new Headers();
	headers.forEach((value, key) => {
		headersReq.append(key, value);
	});

	return new Request(`http://localhost:3000${path}`, {
		method: method_to_string(method),
		headers: headersReq,
	});
}

export function create_mock_env() {
	dotenv.config({
		path: path.resolve(process.cwd(), ".dev.vars"),
		override: true,
	});

	const env = new Map();
	env.set("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
	env.set(
		"PUBLIC_CLERK_PUBLISHABLE_KEY",
		process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
	);
	env.set("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
	env.set("DB", {
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
	});

	return env;
}
