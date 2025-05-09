import type { Context } from "@/index";
import { createClerkClient } from "@clerk/backend";

export const getClerk = (c: Context) => {
	createClerkClient({
		secretKey: c.env.CLERK_SECRET_KEY,
	})
}