import gleam/dict

pub type Env = dict.Dict(String, String)

pub fn get_env(env: Env, var: String) {
	env
	|> dict.get(var)
}
