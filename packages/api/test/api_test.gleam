import gleam/option.{Some}
import lib/rest
import lib/database
import gleeunit/should
import gleam/javascript/promise
import glen
import gleam/dict.{type Dict}
import api
import lib/env.{type Env}
import gleeunit

pub fn main() {
	gleeunit.main()
}

@external(javascript, "./external/ffi.js", "mock_request")
pub fn mock_request(path: String, method: String, headers: Dict(String, String)) -> glen.JsRequest

@external(javascript, "./external/ffi.js", "create_mock_env")
pub fn create_mock_env() -> Env

pub fn routing_test() {
	let js_req = mock_request("/2342342", "GET", dict.new())
	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, dict.new()))
	should.equal(res.status, 404)

	promise.resolve(res)
}

pub fn responses_test() {
	let res = rest.create_response(rest.Ok, Some(dict.from_list([
		#("key", "value")
	])))

	should.equal(res.status, 200)

	promise.resolve(res)
}

pub fn env_test() {
	let env = create_mock_env()
	let db = database.get_db(env)

	database.prepare(db, "SELECT * FROM ?")
	|> database.bind(["users"])
	|> database.run
}