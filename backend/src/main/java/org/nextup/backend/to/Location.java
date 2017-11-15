package org.nextup.backend.to;

import javax.validation.constraints.NotNull;

/**
 * This transfer object transports an event's location.
 */
public class Location {

	@NotNull
	private String address;

	public String getAddress() {
		return address;
	}

	public Location setAddress(String address) {
		this.address = address;
		return this;
	}
}
