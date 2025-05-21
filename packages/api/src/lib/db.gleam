import gleam/dynamic/decode
import gleam/dynamic
import gleam/javascript/promise.{type Promise}
import lib/env.{type Env}

pub type DB
pub type Statement

pub type DBResult {
	DBResult(
		success: Bool,
		results: List(dynamic.Dynamic)
	)
}

pub fn db_result_decoder() -> decode.Decoder(DBResult) {
  use success <- decode.field("success", decode.bool)
  use results <- decode.field("results", decode.list(decode.dynamic))
  decode.success(DBResult(success:, results:))
}

pub type DBUserSubscriptionStatus {
	Active
	Inactive
}

pub fn db_user_subscription_status_decoder() -> decode.Decoder(DBUserSubscriptionStatus) {
  use variant <- decode.then(decode.string)
  case variant {
    "active" -> decode.success(Active)
    _ -> decode.success(Inactive)
  }
}

pub type DBUser {
	DBUser(
		id: Int,
		customer_id: Int,
		subscription_status: DBUserSubscriptionStatus,
	)
}

pub fn db_user_decoder() -> decode.Decoder(DBUser) {
	use id <- decode.field("id", decode.int)
	use customer_id <- decode.field("customer_id", decode.int)
	use subscription_status <- decode.field("subscription_status", db_user_subscription_status_decoder())
	decode.success(DBUser(id:, customer_id:, subscription_status:))
}

@external(javascript, "../external/ffi.js", "get_db")
pub fn get_db(e: Env) -> DB

@external(javascript, "../external/ffi.js", "prepare_statement")
pub fn prepare(db: DB, sql: String) -> Statement

@external(javascript, "../external/ffi.js", "bind_params")
pub fn bind(stmt: Statement, params: List(String)) -> Statement

@external(javascript, "../external/ffi.js", "run_statement")
pub fn run(stmt: Statement) -> Promise(Result(String, String))