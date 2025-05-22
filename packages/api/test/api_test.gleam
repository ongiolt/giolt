import lib/db
import gleeunit/should
import gleam/javascript/promise
import glen
import gleam/http
import gleam/dict.{type Dict}
import api
import lib/env.{type Env}
import gleeunit

pub fn main() {
	gleeunit.main()
}

@external(javascript, "./external/test.js", "mock_request")
pub fn mock_request(path: String, method: http.Method, headers: Dict(String, String)) -> glen.JsRequest

@external(javascript, "./external/test.js", "create_mock_env")
pub fn create_mock_env() -> Env

pub fn routing_test() {
	let js_req = mock_request("/2342342", http.Get, dict.new())
	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, dict.new()))
	should.equal(res.status, 404)

	promise.resolve(res)
}


pub fn env_test() {
	let env = create_mock_env()
	let db = db.get_db(env)

	db.prepare(db, "SELECT * FROM ?")
	|> db.bind(["users"])
	|> db.run
}