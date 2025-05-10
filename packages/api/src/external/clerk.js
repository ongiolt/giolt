import { createClerkClient } from "@clerk/backend";

/**
 * @param {String} secret_key
 * @returns ClerkClient
 */
export function create_client(secret_key) {
	return createClerkClient({
		secretKey: secret_key,
	});
}
