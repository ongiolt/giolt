import { Hono, type Context as HonoContext } from 'hono'

type Bindings = {
	CLERK_SECRET_KEY: string
}

const app = new Hono<{Bindings: Bindings}>()

export type Context = HonoContext<{ Bindings: Bindings }>

app.get('/ping', (c) => {
	return c.text('Pong!')
})

export default app
