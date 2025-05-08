import routes/ping.{ping_route}
import conversation
import gleam/http/request.{type Request}
import gleam/javascript/promise
import glen
import glen/status

pub fn handle(req: Request(conversation.RequestBody)) {
	case glen.path_segments(req) {
		["ping"] -> ping_route()
		_ -> not_found_route()
	}
}

fn not_found_route() {
	"404"
	|> glen.text(status.not_found)
	|> promise.resolve
}