export const getWazeUrl = (location: string): string => {
	const encodedLocation = encodeURIComponent(location);
	return `https://waze.com/ul?q=${encodedLocation}&navigate=yes`;
};

export const getGoogleMapsUrl = (location: string): string => {
	const encodedLocation = encodeURIComponent(location);
	return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
};

export const getAppleMapsUrl = (location: string): string => {
	const encodedLocation = encodeURIComponent(location);
	return `https://maps.apple.com/?q=${encodedLocation}`;
};
