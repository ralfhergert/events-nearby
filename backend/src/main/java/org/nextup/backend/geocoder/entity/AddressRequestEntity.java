package org.nextup.backend.geocoder.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * This entity stores previously done geo-coding request.
 */
@Entity
public class AddressRequestEntity {

	@Id
	private String query;
	@NotNull
	private Date createdDate = new Date();
	@OneToOne(cascade = CascadeType.ALL)
	private AddressEntity address;

	public String getQuery() {
		return query;
	}

	public AddressRequestEntity setQuery(String query) {
		this.query = query;
		return this;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public AddressRequestEntity setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
		return this;
	}

	public AddressEntity getAddress() {
		return address;
	}

	public AddressRequestEntity setAddress(AddressEntity address) {
		this.address = address;
		return this;
	}
}
