import gleam/javascript/promise.{type Promise}

pub type DB
pub type Statement

@external(javascript, "../external/ffi.js", "prepare_statement")
pub fn prepare(db: DB, sql: String) -> Statement

@external(javascript, "../external/ffi.js", "bind_params")
pub fn bind(stmt: Statement, params: List(String)) -> Statement

@external(javascript, "../external/ffi.js", "run_statement")
pub fn run(stmt: Statement) -> Promise(Result(String, String))