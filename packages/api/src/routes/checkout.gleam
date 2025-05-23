import lib/stripe
import gleam/option.{Some, None}
import lib/rest
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
				Ok(customer_id) -> {
					let sess_url = stripe.create_checkout_session(
						strp,
						customer_id,
						env.get_web_origin(e)
					)
					use sess_url <- promise.await(sess_url)

					case sess_url {
						Ok(sess_url) -> {
							rest.create_response(rest.Redirected, None, Some(sess_url)) |> promise.resolve
						}
						Error(_) -> rest.create_response(rest.InternalServerError, None, None) |> promise.resolve
					}
				}
				Error(_) -> rest.create_response(rest.Unauthorized, None, None) |> promise.resolve
			}
		}
		False -> rest.create_response(rest.Unauthorized, None, None) |> promise.resolve
	}
}
