import * as glen from "../glen/glen.mjs";
import * as app from "./api.mjs";

export default {
	async fetch(request, env) {
		const req = glen.convert_request(request);
		let response;
		let res;
		try {
			response = await app.handler(req, new Map(Object.entries(env)));
			res = glen.convert_response(response);
		} catch (err) {
			res = new Response("Internal Server Error", {
				status: 500,
				headers: {
					"Content-Type": "text/plain",
				},
			});
			console.error("Error in handler:", err);
		}

		return res;
	},
};
