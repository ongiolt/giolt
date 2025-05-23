import gleam/dynamic/decode
import gleam/dynamic
import gleam/javascript/promise.{type Promise}
import lib/env.{type Env}

pub type Database
pub type Statement

pub type DatabaseResult {
	DBResult(
		success: Bool,
		results: List(dynamic.Dynamic)
	)
}

pub fn db_result_decoder() -> decode.Decoder(DatabaseResult) {
  use success <- decode.field("success", decode.bool)
  use results <- decode.field("results", decode.list(decode.dynamic))
  decode.success(DBResult(success:, results:))
}

@external(javascript, "../external/ffi.js", "get_db")
pub fn get_db(e: Env) -> Database

@external(javascript, "../external/ffi.js", "prepare_statement")
pub fn prepare(db: Database, sql: String) -> Statement

@external(javascript, "../external/ffi.js", "bind_params")
pub fn bind(stmt: Statement, params: List(String)) -> Statement

@external(javascript, "../external/ffi.js", "run_statement")
pub fn run(stmt: Statement) -> Promise(Result(String, String))