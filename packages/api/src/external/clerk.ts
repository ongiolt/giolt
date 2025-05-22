import { type ClerkClient, createClerkClient } from "@clerk/backend";
import * as conversation from "../../build/dev/javascript/conversation/conversation.mjs";
import type { Request$ } from "../../build/dev/javascript/gleam_http/gleam/http/request.d.mts";

export function create_client(
	secret_key: string,
	publishable_key: string,
): ClerkClient {
	return createClerkClient({
		secretKey: secret_key,
		publishableKey: publishable_key,
	});
}

export async function is_authenticated(
	client: ClerkClient,
	req: Request$<conversation.RequestBody$>,
): Promise<boolean> {
	const jsReq: Request = conversation.to_js_request(req);
	const result = await client.authenticateRequest(jsReq);

	return result.isSignedIn;
}

export async function testing_create_token(
	client: ClerkClient,
): Promise<string> {
	const sess = await client.sessions.createSession({
		userId: "user_2xS41svYSP8AueDYMHNMhfodsWl", // This is a test user created in the Clerk dashboard
	});

	const token = await client.sessions.getToken(sess.id, "");

	return token.jwt;
}
