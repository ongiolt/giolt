import { clerkMiddleware } from "@clerk/astro/server";
import { defineMiddleware, sequence } from "astro/middleware";
import { Stripe } from "stripe";

export const stripeMiddleware = defineMiddleware(async (ctx, next) => {
	const stripe = new Stripe(ctx.locals.runtime.env.STRIPE_SECRET_KEY);
	ctx.locals.stripe = stripe;

	return next();
});

export const onRequest = sequence(clerkMiddleware(), stripeMiddleware);
