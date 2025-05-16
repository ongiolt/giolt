import { clerkClient } from "@clerk/astro/server";
import type { APIContext } from "astro";

export const getStripeCustomer = async (ctx: APIContext, userId: string) => {
	const user = await ctx.locals.currentUser();

	if (!user) {
		return null;
	}

	if (user.privateMetadata.customerId) {
		return user.privateMetadata.customerId as string;
	}

	return createStripeCustomer(ctx, userId);
};

export const createStripeCustomer = async (ctx: APIContext, userId: string) => {
	const { stripe, currentUser } = ctx.locals;

	const user = await currentUser();

	if (!user) {
		return null;
	}

	const customer = await stripe.customers.create({
		email: user.primaryEmailAddress?.emailAddress,
		name: user.fullName ?? undefined,
		metadata: {
			accountId: user.id,
		},
	});

	await clerkClient(ctx).users.updateUserMetadata(userId, {
		privateMetadata: {
			customerId: customer.id,
		},
	});

	return customer.id;
};
