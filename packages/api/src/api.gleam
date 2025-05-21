import gleam/http
import gleam/http/response
import gleam/javascript/promise
import lib/env.{type Env}
import gleam/http/request
import glen

import routes/ping
import routes/db

pub fn handler(req: request.Request(glen.RequestBody), e: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	case req.method {
		// Get Requests
		http.Get -> case glen.path_segments(req) {
			[] -> glen.text("OK", 200) |> promise.resolve
			["ping"] -> ping.route()
			["db"] -> db.route(e)
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

