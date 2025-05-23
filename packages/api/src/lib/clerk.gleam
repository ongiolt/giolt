import gleam/javascript/promise
import glen
import lib/env.{type Env}
import gleam/http/request.{type Request}

pub type ClerkClient

pub type User {
	User(
		id: String,
		private_metadata: UserPrivateMetadata
	)
}

pub type UserPrivateMetadata {
	UserPrivateMetadata(
		customer_id: Result(String, Nil),
		subscription_id: Result(String, Nil),
		subscription_status: Result(String, Nil),
	)
}

@external(javascript, "../external/ffi.js", "create_clerk_client")
fn create_client_internal(secret_key: String, publishable_key: String) -> ClerkClient

@external(javascript, "../external/ffi.js", "is_authenticated")
pub fn is_authenticated(client: ClerkClient, req: Request(glen.RequestBody)) -> promise.Promise(Bool)

@external(javascript, "../external/ffi.js", "get_user")
pub fn get_user(client: ClerkClient, req: Request(glen.RequestBody)) -> promise.Promise(Result(User, String))

@external(javascript, "../external/ffi.js", "update_user_metadata")
pub fn update_user_metadata(client: ClerkClient, req: Request(glen.RequestBody), metadata: UserPrivateMetadata) -> promise.Promise(Result(User, String))

@external(javascript, "../external/ffi.js", "testing_create_token")
pub fn testing_create_token(client: ClerkClient) -> promise.Promise(String)

pub fn create_client(e: Env) -> ClerkClient {
	let assert Ok(api_key) = env.get_env(e, "CLERK_SECRET_KEY")
	let assert Ok(publishable_key) = env.get_env(e, "PUBLIC_CLERK_PUBLISHABLE_KEY")
	create_client_internal(api_key, publishable_key)
}