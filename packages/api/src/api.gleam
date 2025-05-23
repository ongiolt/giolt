import gleam/http
import gleam/http/response
import gleam/javascript/promise
import lib/env.{type Env}
import gleam/http/request
import glen

import routes/ping
import routes/auth
import routes/checkout
import routes/connect_customer

pub fn handler(req: request.Request(glen.RequestBody), e: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	case req.method {
		// Get Requests
		http.Get -> case glen.path_segments(req) {
			[] -> glen.text("OK", 200) |> promise.resolve
			["ping"] -> ping.route()
			["auth"] -> auth.route(req, e)
			["checkout"] -> checkout.route(req, e)
			_ -> not_found_route()
		}

		// Post Requests
		http.Post -> case glen.path_segments(req) {
			["connect-customer"] -> connect_customer.route(req, e)
			_ -> not_found_route()
		}

		_ -> not_found_route()
	}
}

fn not_found_route() {
	"404"
	|> glen.text(404)
	|> promise.resolve
}

