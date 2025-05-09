import gleam/fetch
import gleam/javascript/promise.{type Promise}
import gleam/http/request
import gleam/http/response.{type Response}

pub fn fetch_clerk_api(path: String, token: String) -> Promise(Result(Response(fetch.FetchBody), fetch.FetchError)) {
	let request = request.new()
	|> request.set_host("https://api.clerk.com/v1")
	|> request.set_path(path)
	|> request.set_body("{\"token\": \"" <> token <> "\"}")
	|> fetch.send

	use res <- promise.try_await(request)

	promise.resolve(Ok(res))
}

pub fn check_client(token: String) -> Promise(Bool) {
	use res <- promise.await(fetch_clerk_api("/client/verify", token))

	let result = case res {
		Ok(r) -> {
			case r.status {
				200 -> True
				_ -> False
			}
		}
		Error(_) -> False
	}

	promise.resolve(result)
}
