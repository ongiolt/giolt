import gleam/dynamic/decode
import gleam/json
import gleam/http
import gleam/fetch
import gleam/dynamic
import gleam/javascript/promise
import glen
import lib/clerk.{type ClerkClient}
import lib/env.{type Env}
import gleam/http/request.{type Request}

pub type StripeClient {
	StripeClient(
		secret_key: String,
		base_url: String
	)
}

@external(javascript, "../external/ffi.js", "get_customer_id")
pub fn get_customer_id(clerk: ClerkClient, stripe: StripeClient, req: Request(glen.RequestBody)) -> promise.Promise(Result(String, String))

@external(javascript, "../external/ffi.js", "create_checkout_session")
pub fn create_checkout_session(stripe: StripeClient, customer_id: String, origin: String) -> promise.Promise(Result(String, String))

// pub fn create_client(e: Env) -> StripeClient {
// 	let assert Ok(api_key) = env.get_env(e, "STRIPE_SECRET_KEY")
// 	create_client_internal(api_key)
// }

pub fn make_request(
	client: StripeClient,
	method: http.Method,
	body: json.Json,
	path: String,
) -> promise.Promise(Result(dynamic.Dynamic, fetch.FetchError)){
	let url = client.base_url <> path
	let assert Ok(req) = request.to(url)
	
	req
	|> request.set_header("Authorization", "Bearer" <> client.secret_key)
	|> request.set_method(method)
	|> request.set_body(json.to_string(body))
	|> request.set_header("Content-Type", "application/json")

	use resp <- promise.try_await(fetch.send(req))
	use resp <- promise.try_await(fetch.read_json_body(resp))

	promise.resolve(Ok(resp.body))
}

type CheckoutSessionResponse {
	CheckoutSessionResponse(
		id: String,
		url: String
	)
}

fn checkout_session_response_decoder() -> decode.Decoder(CheckoutSessionResponse) {
  use id <- decode.field("id", decode.string)
  use url <- decode.field("url", decode.string)
  decode.success(CheckoutSessionResponse(id:, url:))
}

pub fn create_checkout_session_url(
	stripe: StripeClient,
	customer_id: String,
	callback_url: String
) -> promise.Promise(Result(String, String)) {
	let body = json.object([
		#("customer", json.string(customer_id)),
		#("mode", json.string("payment")),
		#("line_items", json.preprocessed_array([
			json.object([
				#("price", json.string("price_1N4Z2dL5z8Y3k9Xy5Z5Z5Z5Z")),
				#("quantity", json.int(1))
			])
		])),
		#("success_url", json.string(callback_url <> "?success=true")),
		#("cancel_url", json.string(callback_url <> "?success=false")),
	])

	use res <- promise.await(make_request(
		stripe,
		http.Post,
		body,
		"/v1/checkout/sessions"
	))

	case res {
		Ok(response) -> {
			let decoded = decode.run(
				response,
				checkout_session_response_decoder(),
			)

			case decoded {
				Ok(CheckoutSessionResponse(id: _, url: url)) -> promise.resolve(Ok(url))
				Error(_) -> promise.resolve(Error("Failed to decode response"))
			}
		}
		Error(_) -> promise.resolve(Error("Failed to make request: "))
	}
}

pub fn create_client(e: Env) -> StripeClient {
	let base_url = "https://api.stripe.com"
	let assert Ok(api_key) = env.get_env(e, "STRIPE_SECRET_KEY")

	StripeClient(
		secret_key: api_key,
		base_url: base_url
	)
}