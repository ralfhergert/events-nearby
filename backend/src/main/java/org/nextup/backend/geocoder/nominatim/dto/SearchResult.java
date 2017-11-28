package org.nextup.backend.geocoder.nominatim.dto;

import com.google.gson.annotations.SerializedName;

/**
 * This DTO resembles a search result from nominatim.
 * See <a href="https://wiki.openstreetmap.org/wiki/Nominatim">Nominatim Wiki</a>
 */
public class SearchResult {

	private NominatimAddress address;
	@SerializedName("boundingbox")
	private BoundingBox boundingBox;
	private double lat;
	private double lon;

	public NominatimAddress getAddress() {
		return address;
	}

	public void setAddress(NominatimAddress address) {
		this.address = address;
	}

	public BoundingBox getBoundingBox() {
		return boundingBox;
	}

	public void setBoundingBox(BoundingBox boundingBox) {
		this.boundingBox = boundingBox;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}
}
