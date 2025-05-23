import gleam/dict
import lib/rest
import gleam/javascript/promise
import gleam/option.{Some, None}

pub fn route() {
	rest.create_response(rest.Ok, Some(dict.from_list([
		#("ping", "pong")
	])), None)
	|> promise.resolve
}