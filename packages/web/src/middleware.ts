import { clerkMiddleware } from "@clerk/astro/server";
import { defineMiddleware, sequence } from "astro/middleware";
import { Stripe } from "stripe";
import { getStripeCustomer } from "./lib/stripe";

export const stripeMiddleware = defineMiddleware(async (ctx, next) => {
	const { userId } = ctx.locals.auth();
	const stripe = new Stripe(ctx.locals.runtime.env.STRIPE_SECRET_KEY);

	ctx.locals.customerId = null;
	ctx.locals.stripe = stripe;

	if (!userId) {
		return next();
	}
	
	const customerId = await getStripeCustomer(ctx, userId);
	
	if (!customerId) {
		return next();
	}

	ctx.locals.customerId = customerId;

	return next();
});

export const onRequest = sequence(clerkMiddleware(), stripeMiddleware);
