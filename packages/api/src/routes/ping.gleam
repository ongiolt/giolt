import gleam/javascript/promise
import glen

pub fn route() {
	"Pong!"
	|> glen.text(200)
	|> promise.resolve
}
