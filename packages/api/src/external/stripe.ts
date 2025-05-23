import type { ClerkClient, User } from "@clerk/backend";
import { Error as Err, Ok, type Result } from "@gleam/api/gleam.mjs";
import * as conversation from "@gleam/conversation/conversation.mjs";
import type { Request as GleamRequest } from "@gleam/gleam_http/gleam/http/request.d.mts";
import { Stripe } from "stripe";

export function create_stripe_client(secret_key: string): Stripe {
	return new Stripe(secret_key);
}

export const get_customer_id = async (
	clerk: Readonly<ClerkClient>,
	stripe: Readonly<Stripe>,
	req: Readonly<GleamRequest<conversation.RequestBody$>>,
): Promise<Result<string, string>> => {
	const jsReq: Request = conversation.to_js_request(req);
	const result = await clerk.authenticateRequest(jsReq);

	if (result.isSignedIn) {
		const auth = result.toAuth();
		const user = await clerk.users.getUser(auth.userId);

		if (user.privateMetadata.customer_id) {
			return new Ok(user.privateMetadata.customer_id);
		}

		return createStripeCustomer(clerk, stripe, user);
	}

	return new Err("User not found");
};

const createStripeCustomer = async (
	clerk: Readonly<ClerkClient>,
	stripe: Readonly<Stripe>,
	user: Readonly<User>,
): Promise<Result<string, string>> => {
	if (!user) {
		return new Err("User not found");
	}

	const customer = await stripe.customers.create({
		metadata: {
			accountId: user.id,
		},
	});

	await clerk.users.updateUserMetadata(user.id, {
		privateMetadata: {
			customer_id: customer.id,
		},
	});

	return new Ok(customer.id);
};

export const create_checkout_session = async (
	stripe: Readonly<Stripe>,
	customer_id: string,
	origin: string,
): Promise<Result<string, string>> => {
	try {
		const session = await stripe.checkout.sessions.create({
			customer: customer_id,
			payment_method_types: ["card"],
			line_items: [
				{
					price: "price_1RQTDyAkkrYozKsy3q3mHCce",
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${origin}/subscribe?success=true`,
			cancel_url: `${origin}/subscribe?success=false`,
		});

		return new Ok(session.url);
	} catch {
		return new Err("Failed to create checkout session");
	}
};
