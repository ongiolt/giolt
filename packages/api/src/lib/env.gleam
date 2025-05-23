import gleam/dict
import gleam/result

pub type Env = dict.Dict(String, String)

pub fn get_env(env: Env, var: String) -> Result(String, Nil) {
	env
	|> dict.get(var)
}

pub fn is_dev(env: Env) -> Bool {
	let var = result.lazy_unwrap(get_env(env, "ENVIRONMENT"), fn () { "development" })

	case var {
		"production" -> False
		"development" -> True
		_ -> True
	}
}

pub fn get_web_origin(env: Env) -> String {
	case is_dev(env) {
		True -> "http://localhost:3000"
		_ -> "https://glen.com"
	}
}

pub fn get_api_origin(env: Env) -> String {
	case is_dev(env) {
		True -> "http://localhost:3001"
		_ -> "https://api.glen.com"
	}
}