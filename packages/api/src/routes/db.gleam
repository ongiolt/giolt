import gleam/http/request
import lib/clerk
import gleam/dynamic/decode
import gleam/json
import lib/db
import lib/env.{type Env}
import gleam/javascript/promise
import gleam/http/response
import glen

pub fn route(req: request.Request(glen.RequestBody), e: Env) -> promise.Promise(response.Response(glen.ResponseBody)) {
	let clrk = clerk.create_client(e)
	use is_authed <- promise.await(clerk.is_authenticated(clrk, req))
	
	case is_authed {
		True -> {
			let database = db.get_db(e)

				use res <- promise.await(
					db.prepare(database, "SELECT * FROM users")
					|> db.run
				)

				case res {
					Ok(data) -> {
						let assert Ok(data_parsed) = json.parse(data, db.db_result_decoder())
						case data_parsed.results {
							[row,_] -> {
								let assert Ok(user) = decode.run(row, db.db_user_decoder())

								case user.subscription_status {
									db.Active -> glen.text("OK", 200) |> promise.resolve
									db.Inactive -> glen.text("Inactive", 200) |> promise.resolve
								}
							}
							_ -> glen.text("No users found", 404) |> promise.resolve
						}
					}
					Error(err) -> glen.text(err, 500) |> promise.resolve
				}
		}
		False -> {
			glen.text("Unauthorized", 401) |> promise.resolve
		}
	}
}
