import gleam/javascript/promise
import glen/status
import glen

pub fn ping_route() {
	"Pong!"
	|> glen.text(status.ok)
	|> promise.resolve
}