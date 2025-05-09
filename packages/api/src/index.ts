import type { Context as HonoContext } from 'hono'
import { OpenAPIHono } from "@hono/zod-openapi";

import pingRoute from './endpoints/ping';

export type Bindings = {
	CLERK_SECRET_KEY: string
}

const app = new OpenAPIHono<{Bindings: Bindings}>()

export type Context = HonoContext<{ Bindings: Bindings }>

app.route('/ping', pingRoute)

app.doc('/openapi.json', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Giolt API',
	},
})  

export default app
