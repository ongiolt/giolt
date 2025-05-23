import path from "node:path";
import { Ok } from "@gleam/api/gleam.mjs";
import dotenv from "dotenv";

export function mock_request(
	path: Readonly<string>,
	method: Readonly<"GET" | "POST" | "PUT" | "DELETE">,
	headers = new Map(),
) {
	const headersReq = new Headers();
	headers.forEach((value, key) => {
		headersReq.append(key, value);
	});

	return new Request(`http://localhost:3000${path}`, {
		method: method,
		headers: headersReq,
	});
}

export function create_mock_env() {
	dotenv.config({
		path: path.resolve(process.cwd(), ".dev.vars"),
		override: true,
		processEnv: process.env as Record<string, string>,
	});

	const env = new Map();
	env.set("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY);
	env.set(
		"PUBLIC_CLERK_PUBLISHABLE_KEY",
		process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
	);
	env.set("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
	env.set("DB", {
		prepare: (_sql: string) => ({
			bind: (_params: string[]) => ({
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
