package org.nextup.backend.geocoder.nominatim.dto;

import com.google.gson.annotations.SerializedName;

/**
 * This DTO resembles the address in a {@link SearchResult} from nominatim.
 * See <a href="https://wiki.openstreetmap.org/wiki/Nominatim">Nominatim Wiki</a>
 */
public class NominatimAddress {

	private String country;
	@SerializedName("country_code")
	private String countryCode;
	private String state;
	private String city;
	private String postcode;
	private String road;
	@SerializedName("house_number")
	private String houseNumber;

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getRoad() {
		return road;
	}

	public void setRoad(String road) {
		this.road = road;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}
}
