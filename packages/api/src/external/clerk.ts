import { createClerkClient, type ClerkClient } from "@clerk/backend";
import * as glen from "../../build/dev/javascript/glen/glen.mjs";

export function create_client(secret_key: string): ClerkClient {
	return createClerkClient({
		secretKey: secret_key,
	});
}

export async function is_authenticated(client: ClerkClient, req: Request): Promise<boolean> {
	const result = await client.authenticateRequest(req);

	return result.isSignedIn
}