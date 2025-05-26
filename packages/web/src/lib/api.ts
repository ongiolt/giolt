interface Response {
	status: "ok" | "unauthorized" | "not_found" | "internal_server_error";
	data: Record<string, string>;
}

export const origin = import.meta.env.DEV
	? "http://localhost:3001"
	: "https://api.giolt.com";

export const request = async (
	token: string,
	path: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
) => {
	const res = await fetch(new URL(path, origin), {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error(`Request failed with status ${res.status}`);
	}

	const data = (await res.json()) as Response;

	return data;
};

export const checkoutLink = `${origin}/checkout`;
