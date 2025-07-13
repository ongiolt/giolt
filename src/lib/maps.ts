export const getWazeUrl = (location: string): string => {
	return encodeURI(`https://waze.com/ul?q=${location}&navigate=yes`);
};

export const getGoogleMapsUrl = (location: string): string => {
	return encodeURI(
		`https://www.google.com/maps/search/?api=1&query=${location}`,
	);
};

export const getAppleMapsUrl = (location: string): string => {
	return encodeURI(`https://maps.apple.com/?q=${location}`);
};

export const getMapsImage = async (location: string): Promise<string> => {
	const url = encodeURI(
		`https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=17&size=400x300&scale=2&markers=size:mid|color:red|${location}&key=${import.meta.env.GOOGLE_MAPS_API_KEY}`,
	);

	return await signMapsStaticURL(url, import.meta.env.GOOGLE_MAPS_SECRET);
};

function removeWebSafe(safeEncodedString: string): string {
	return safeEncodedString.replace(/-/g, "+").replace(/_/g, "/");
}

function makeWebSafe(encodedString: string): string {
	return encodedString.replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeBase64Hash(code: string): Uint8Array {
	const binaryString = atob(code);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes;
}

async function encodeBase64Hash(
	key: Uint8Array,
	data: string,
): Promise<string> {
	const encoder = new TextEncoder();
	const cryptoKey = await crypto.subtle.importKey(
		"raw",
		key,
		{ name: "HMAC", hash: "SHA-1" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		cryptoKey,
		encoder.encode(data),
	);
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function signMapsStaticURL(
	path: string,
	secret: string,
): Promise<string> {
	const uri = new URL(path);
	const safeSecret = decodeBase64Hash(removeWebSafe(secret));
	const hashedSignature = makeWebSafe(
		await encodeBase64Hash(safeSecret, uri.pathname + uri.search),
	);
	return `${uri.toString()}&signature=${hashedSignature}`;
}
