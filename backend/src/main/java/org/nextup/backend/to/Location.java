package org.nextup.backend.to;

/**
 * This transfer object transports an event's location.
 */
public class Location {

	private String address;

	public String getAddress() {
		return address;
	}

	public Location setAddress(String address) {
		this.address = address;
		return this;
	}
}
