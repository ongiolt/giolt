import gleam/dynamic/decode
import glen
import gleam/json
import gleam/dict
import gleam/option.{Some}
import gleam/http/response

pub type ApiResponseStatus {
	Ok
	Unauthorized
	NotFound
	Redirected
	InternalServerError
}

fn api_response_status_decoder() -> decode.Decoder(ApiResponseStatus) {
	use variant <- decode.then(decode.string)
	case variant {
		"ok" -> decode.success(Ok)
		"unauthorized" -> decode.success(Unauthorized)
		"not_found" -> decode.success(NotFound)
		"redirected" -> decode.success(Redirected)
		"internal_server_error" | _ -> decode.success(InternalServerError)
	}
}

fn encode_api_response_status(api_response_status: ApiResponseStatus) -> json.Json {
	case api_response_status {
		Ok -> json.string("ok")
		Unauthorized -> json.string("unauthorized")
		NotFound -> json.string("not_found")
		Redirected -> json.string("redirected")
		InternalServerError -> json.string("internal_server_error")
	}
}

fn api_response_status_code(api_response_status: ApiResponseStatus) -> Int {
	case api_response_status {
		Ok -> 200
		Unauthorized -> 401
		NotFound -> 404
		Redirected -> 302
		InternalServerError -> 500
	}
}

pub type ApiResponse {
	ApiResponse(
		status: ApiResponseStatus,
		data: option.Option(dict.Dict(String, String)),
	)
}

pub fn api_response_decoder() -> decode.Decoder(ApiResponse) {
	use status <- decode.field("status", api_response_status_decoder())
	use data <- decode.field("data", decode.optional(decode.dict(decode.string, decode.string)))
	decode.success(ApiResponse(status:, data:))
}

fn encode_api_response(api_response: ApiResponse) -> json.Json {
	let ApiResponse(status:, data:) = api_response
	json.object([
		#("status", encode_api_response_status(status)),
		#("data", case data {
			option.None -> json.null()
			option.Some(value) -> json.dict(value, fn(string) { string }, json.string)
		}),
	])
}


pub fn create_response(
	status: ApiResponseStatus,
	data: option.Option(dict.Dict(String, String)),
	redirect_url: option.Option(String)
) -> response.Response(glen.ResponseBody) {
	
	case status {
		Redirected -> {
			let assert Some(redirect_url) = redirect_url
			glen.redirect(redirect_url, 302)
		}
		_ -> {
			glen.json(json.to_string(encode_api_response(ApiResponse(status, data))), api_response_status_code(status))
		}
	}
}