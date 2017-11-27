package org.nextup.backend.geocoder.to;

import org.nextup.backend.geocoder.entity.AddressEntity;

/**
 * This transfer object transports a single address.
 */
public class Address {

	private String country;
	private String countryCode;
	private String state;
	private String city;
	private String postcode;
	private String street;
	private String houseNumber;
	private Double lat;
	private Double lon;
	private Double boundingMinLon;
	private Double boundingMaxLon;
	private Double boundingMinLat;
	private Double boundingMaxLat;

	public Address() {}

	public Address(AddressEntity entity) {
		country = entity.getCountry();
		countryCode = entity.getCountryCode();
		state = entity.getState();
		city = entity.getCity();
		postcode = entity.getPostcode();
		street = entity.getStreet();
		houseNumber = entity.getHouseNumber();
		lat = entity.getLat();
		lon = entity.getLon();
		boundingMinLon = entity.getBoundingMinLon();
		boundingMaxLon = entity.getBoundingMaxLon();
		boundingMinLat = entity.getBoundingMinLat();
		boundingMaxLat = entity.getBoundingMaxLat();
	}

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

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLon() {
		return lon;
	}

	public void setLon(Double lon) {
		this.lon = lon;
	}

	public Double getBoundingMinLon() {
		return boundingMinLon;
	}

	public void setBoundingMinLon(Double boundingMinLon) {
		this.boundingMinLon = boundingMinLon;
	}

	public Double getBoundingMaxLon() {
		return boundingMaxLon;
	}

	public void setBoundingMaxLon(Double boundingMaxLon) {
		this.boundingMaxLon = boundingMaxLon;
	}

	public Double getBoundingMinLat() {
		return boundingMinLat;
	}

	public void setBoundingMinLat(Double boundingMinLat) {
		this.boundingMinLat = boundingMinLat;
	}

	public Double getBoundingMaxLat() {
		return boundingMaxLat;
	}

	public void setBoundingMaxLat(Double boundingMaxLat) {
		this.boundingMaxLat = boundingMaxLat;
	}
}
