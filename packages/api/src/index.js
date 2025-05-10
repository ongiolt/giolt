import * as app from "./api.mjs";
import * as glen from "../glen/glen.mjs";

export default {
	async fetch(request, env) {
		const req = glen.convert_request(request);
		const response = await app.handler(req, new Map(Object.entries(env)));
		const res = glen.convert_response(response);

		return res;
	},
};
