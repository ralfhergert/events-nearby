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

	public String getState() {
		return state;
	}

	public AddressEntity setState(String state) {
		this.state = state;
		return this;
	}

	public String getCity() {
		return city;
	}

	public AddressEntity setCity(String city) {
		this.city = city;
		return this;
	}

	public String getPostcode() {
		return postcode;
	}

	public AddressEntity setPostcode(String postcode) {
		this.postcode = postcode;
		return this;
	}

	public String getStreet() {
		return street;
	}

	public AddressEntity setStreet(String street) {
		this.street = street;
		return this;
	}

	public String getHouseNumber() {
		return houseNumber;
	}

	public AddressEntity setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
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

	public Double getBoundingMinLon() {
		return boundingMinLon;
	}

	public AddressEntity setBoundingMinLon(Double boundingMinLon) {
		this.boundingMinLon = boundingMinLon;
		return this;
	}

	public Double getBoundingMaxLon() {
		return boundingMaxLon;
	}

	public AddressEntity setBoundingMaxLon(Double boundingMaxLon) {
		this.boundingMaxLon = boundingMaxLon;
		return this;
	}

	public Double getBoundingMinLat() {
		return boundingMinLat;
	}

	public AddressEntity setBoundingMinLat(Double boundingMinLat) {
		this.boundingMinLat = boundingMinLat;
		return this;
	}

	public Double getBoundingMaxLat() {
		return boundingMaxLat;
	}

	public AddressEntity setBoundingMaxLat(Double boundingMaxLat) {
		this.boundingMaxLat = boundingMaxLat;
		return this;
	}
}
