import * as glen from "../glen/glen.mjs";
import * as api from "./api.mjs";

export default {
	async fetch(request, _env, _ctx) {
		const req = glen.convert_request(request);
		const response = await api.handle(req);
		const res = glen.convert_response(response);

		return res;
	}
}
