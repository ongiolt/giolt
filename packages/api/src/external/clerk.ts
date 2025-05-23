import { type ClerkClient, type User, createClerkClient } from "@clerk/backend";
import { Error as Err, Ok, type Result } from "@gleam/api/gleam.mjs";
import {
	User as GleamClerkUser,
	UserPrivateMetadata,
} from "@gleam/api/lib/clerk.mjs";
import * as conversation from "@gleam/conversation/conversation.mjs";
import type { Request as GleamRequest } from "@gleam/gleam_http/gleam/http/request.d.mts";
import { lazy_unwrap } from "@gleam/gleam_stdlib/gleam/result.mjs";

export function create_clerk_client(
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
	req: GleamRequest<conversation.RequestBody$>,
): Promise<boolean> {
	const jsReq: Request = conversation.to_js_request(req);
	const result = await client.authenticateRequest(jsReq);

	return result.isSignedIn;
}

export async function get_user(
	client: Readonly<ClerkClient>,
	req: Readonly<GleamRequest<conversation.RequestBody$>>,
): Promise<Result<GleamClerkUser, string>> {
	const jsReq: Request = conversation.to_js_request(req);
	const result = await client.authenticateRequest(jsReq);

	if (result.isSignedIn) {
		const auth = result.toAuth();
		const user = await client.users.getUser(auth.userId);
		if (user) {
			return new Ok(
				new GleamClerkUser(
					user.id,
					new UserPrivateMetadata(
						user.privateMetadata.customer_id
							? new Ok(user.privateMetadata.customer_id)
							: new Err(null),
						user.privateMetadata.subscription_id
							? new Ok(user.privateMetadata.subscription_id)
							: new Err(null),
						user.privateMetadata.subscription_status
							? new Ok(user.privateMetadata.subscription_status)
							: new Err(null),
					),
				),
			);
		}
		return new Err("User not found");
	}

	return new Err("User is not signed in");
}

export async function update_user_metadata(
	client: Readonly<ClerkClient>,
	req: Readonly<GleamRequest<conversation.RequestBody$>>,
	user_metadata: UserPrivateMetadata,
): Promise<Result<GleamClerkUser, string>> {
	const jsReq: Request = conversation.to_js_request(req);
	const result = await client.authenticateRequest(jsReq);

	if (result.isSignedIn) {
		const auth = result.toAuth();
		const user = await client.users.updateUserMetadata(auth.userId, {
			privateMetadata: {
				customer_id: lazy_unwrap(user_metadata.customer_id, () => null),
				subscription_id: lazy_unwrap(
					user_metadata.subscription_id,
					() => null,
				),
				subscription_status: lazy_unwrap(
					user_metadata.subscription_status,
					() => null,
				),
			},
		});
		if (user) {
			return new Ok(
				new GleamClerkUser(
					user.id,
					new UserPrivateMetadata(
						user.privateMetadata.customer_id
							? new Ok(user.privateMetadata.customer_id)
							: new Err(null),
						user.privateMetadata.subscription_id
							? new Ok(user.privateMetadata.subscription_id)
							: new Err(null),
						user.privateMetadata.subscription_status
							? new Ok(user.privateMetadata.subscription_status)
							: new Err(null),
					),
				),
			);
		}
		return new Err("User not found");
	}

	return new Err("User is not signed in");
}

// TESTING
export async function testing_create_token(
	client: Readonly<ClerkClient>,
): Promise<string> {
	const sess = await client.sessions.createSession({
		userId: "user_2xS41svYSP8AueDYMHNMhfodsWl", // This is a test user created in the Clerk dashboard
	});

	const token = await client.sessions.getToken(sess.id, "");

	return token.jwt;
}
