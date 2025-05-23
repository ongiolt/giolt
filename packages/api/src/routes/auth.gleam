import gleam/option.{None}
import lib/rest
import gleam/http/request
import lib/clerk
import lib/env.{type Env}
import gleam/javascript/promise
import gleam/http/response
import glen

pub fn route(req: request.Request(glen.RequestBody), e: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	let clrk = clerk.create_client(e)
	use is_authed <- promise.await(clerk.is_authenticated(clrk, req))
	
	case is_authed {
		True ->	rest.create_response(rest.Ok, None, None) |> promise.resolve
		False -> rest.create_response(rest.Unauthorized, None, None) |> promise.resolve
	}
}
