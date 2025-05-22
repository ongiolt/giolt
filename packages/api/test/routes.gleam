import gleam/dict
import lib/clerk
import gleeunit/should
import gleam/http
import api
import gleam/javascript/promise
import glen
import api_test.{mock_request}


pub fn ping_route_test() {
	let js_req = mock_request("/ping", http.Get, dict.new())
	let mock_env = api_test.create_mock_env()
	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, mock_env))
	should.equal(res.status, 200)

	promise.resolve(res)
}

pub fn auth_route_unauthed_test() {
	let mock_env = api_test.create_mock_env()
	let js_req = mock_request("/auth", http.Get, dict.new())

	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, mock_env))
	should.equal(res.status, 401)

	promise.resolve(res)
}

pub fn auth_route_authed_test() {
	let mock_env = api_test.create_mock_env()

	let clerk = clerk.create_client(mock_env)
	let token = clerk.testing_create_token(clerk)
	use token <- promise.await(token)

	let headers = dict.new()
	|> dict.insert("Authorization", "Bearer "<> token)
	let js_req = mock_request("/auth", http.Get, headers)

	let req = glen.convert_request(js_req)

	use res <- promise.await(api.handler(req, mock_env))
	should.equal(res.status, 200)

	promise.resolve(res)
}
