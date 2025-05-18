import { getStripeCustomer } from "@/lib/stripe";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (ctx) => {
	const { stripe, currentUser } = ctx.locals;
	const user = await currentUser();

	if (!user) {
		return Response.json(
			{ error: "Not authenticated" },
			{
				status: 401,
			},
		);
	}

	const customerId = await getStripeCustomer(ctx, user.id);

	if (!customerId) {
		return Response.json(
			{ error: "Error retrieving customer" },
			{
				status: 500,
			},
		);
	}

	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: ctx.url.searchParams.get("return_url") || ctx.url.origin + "/dashboard",
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: session.url,
		},
	});
};
