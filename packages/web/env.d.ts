type Stripe = import("stripe").Stripe;
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		stripe: Stripe;
		customerId: string | null;
	}
}
