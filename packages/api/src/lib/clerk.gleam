import gleam/javascript/promise
import glen
import lib/env.{type Env}
import gleam/http/request.{type Request}

pub type ClerkClient

@external(javascript, "../external/ffi.js", "create_client")
fn create_client_internal(secret_key: String) -> ClerkClient

@external(javascript, "../external/ffi.js", "is_authenticated")
pub fn is_authenticated(client: ClerkClient, req: Request(glen.RequestBody)) -> promise.Promise(Bool)

pub fn create_client(e: Env) -> ClerkClient {
	let assert Ok(api_key) = env.get_env(e, "CLERK_API_KEY")
	create_client_internal(api_key)
}