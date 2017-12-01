export class GPSLocation {
	lat: number;
	lon: number;

	constructor(lat: number, lon: number) {
		this.lat = lat;
		this.lon = lon;
	}

	public equals(location: GPSLocation): boolean {
		return location != null && this.lat == location.lat && this.lon == location.lon;
	}
}
