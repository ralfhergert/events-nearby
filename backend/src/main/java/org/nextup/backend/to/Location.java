package org.nextup.backend.to;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * This transfer object transports an event's location.
 */
public class Location {

	@NotNull
	@NotBlank
	@Size(max = 160)
	private String address;

	public String getAddress() {
		return address;
	}

	public Location setAddress(String address) {
		this.address = address;
		return this;
	}
}
