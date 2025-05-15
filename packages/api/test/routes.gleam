import gleeunit/should
import gleam/http
import gleam/dict
import api
import gleam/javascript/promise
import glen
import api_test.{mock_request}


pub fn ping_route_test() {
	let js_req = mock_request("/ping", http.Get)
	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, dict.new()))
	should.equal(res.status, 200)

	promise.resolve(res)
}
