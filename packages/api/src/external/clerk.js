import { createClerkClient } from "@clerk/backend";

/**
* @param {string} secret_key
* @returns ClerkClient
*/
export function create_client(secret_key) {
	return createClerkClient({
		secretKey: secret_key
	})
}
