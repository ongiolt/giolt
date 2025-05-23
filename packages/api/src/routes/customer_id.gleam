import gleam/dict
import gleam/option.{Some, None}
import lib/rest
import lib/stripe
import gleam/http/request
import lib/clerk
import lib/env.{type Env}
import gleam/javascript/promise
import gleam/http/response
import glen

pub fn route(req: request.Request(glen.RequestBody), e: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	let clrk = clerk.create_client(e)
	let strp = stripe.create_client(e)
	use is_authed <- promise.await(clerk.is_authenticated(clrk, req))
	
	case is_authed {
		True ->	{
			use customer_id <- promise.await(stripe.get_customer_id(clrk, strp, req))

			case customer_id {
				Ok(cus) -> rest.create_response(rest.Ok, Some(dict.from_list([
					#("customer_id", cus)
				]))) |> promise.resolve
				Error(_) -> rest.create_response(rest.InternalServerError, None) |> promise.resolve
			}
		}
		False -> rest.create_response(rest.Unauthorized, None) |> promise.resolve
	}
}
