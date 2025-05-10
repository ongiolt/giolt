import gleam/http
import gleam/http/response
import gleam/javascript/promise
import routes/ping
import lib/env.{type Env}
import gleam/http/request
import glen

pub fn handler(req: request.Request(glen.RequestBody), _env: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	case req.method {
		// Get Requests
		http.Get -> case glen.path_segments(req) {
			["ping"] -> ping.route()
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
