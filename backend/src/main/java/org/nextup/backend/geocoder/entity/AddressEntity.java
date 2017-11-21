package org.nextup.backend.geocoder.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * This entity resembles an address.
 */
@Entity
public class AddressEntity {

	@Id
	@GeneratedValue
	private long id;
	private String city;
	private String country;
	private String countryCode;
	private String houseNumber;
	private String postcode;
	private String state;
	private Double lat;
	private Double lon;

	public String getCity() {
		return city;
	}

	public AddressEntity setCity(String city) {
		this.city = city;
		return this;
	}

	public String getCountry() {
		return country;
	}

	public AddressEntity setCountry(String country) {
		this.country = country;
		return this;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public AddressEntity setCountryCode(String countryCode) {
		this.countryCode = countryCode;
		return this;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public AddressEntity setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
		return this;
	}

	public String getPostcode() {
		return postcode;
	}

	public AddressEntity setPostcode(String postcode) {
		this.postcode = postcode;
		return this;
	}

	public String getState() {
		return state;
	}

	public AddressEntity setState(String state) {
		this.state = state;
		return this;
	}

	public Double getLat() {
		return lat;
	}

	public AddressEntity setLat(Double lat) {
		this.lat = lat;
		return this;
	}

	public Double getLon() {
		return lon;
	}

	public AddressEntity setLon(Double lon) {
		this.lon = lon;
		return this;
	}
}
