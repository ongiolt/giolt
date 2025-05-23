import gleam/javascript/promise
import glen
import lib/clerk.{type ClerkClient}
import lib/env.{type Env}
import gleam/http/request.{type Request}

pub type StripeClient

@external(javascript, "../external/ffi.js", "create_stripe_client")
fn create_client_internal(secret_key: String) -> StripeClient

@external(javascript, "../external/ffi.js", "get_customer_id")
pub fn get_customer_id(clerk: ClerkClient, stripe: StripeClient, req: Request(glen.RequestBody)) -> promise.Promise(Result(String, String))

pub fn create_client(e: Env) -> StripeClient {
	let assert Ok(api_key) = env.get_env(e, "STRIPE_SECRET_KEY")
	create_client_internal(api_key)
}