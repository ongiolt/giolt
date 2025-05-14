import gleeunit/should
import gleam/javascript/promise
import glen
import gleam/http
import gleam/dict
import api
import gleeunit

pub fn main() {
	gleeunit.main()
}

@external(javascript, "./external/test.js", "mock_request")
pub fn mock_request(path: String, method: http.Method) -> glen.JsRequest

pub fn routing_test() {
	let js_req = mock_request("/2342342", http.Get)
	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, dict.new()))
	should.equal(res.status, 404)

	promise.resolve(res)
}
