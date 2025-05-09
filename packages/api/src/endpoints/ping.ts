import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import type { Bindings } from "..";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

const route = createRoute({
	method: "get",
	path: "/",
	description: "Ping the server",
	responses: {
		200: {
			content: {
				"text/plain": {
					schema: z.string(),
				},
			},
			description: "Pong!",
		},
	},
});

app.openapi(route, (c) => {
	return c.text("Pong!");
});

export default app;
