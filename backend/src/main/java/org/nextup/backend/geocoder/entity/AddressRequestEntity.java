package org.nextup.backend.geocoder.entity;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * This entity stores previously done geo-coding request.
 */
@Entity
public class AddressRequestEntity {

	@Id
	@GeneratedValue
	private long id;
	@NotNull
	private Date createdDate = new Date();
	@NotEmpty
	private String query;
	@OneToOne(cascade = CascadeType.ALL)
	private AddressEntity address;

	public long getId() {
		return id;
	}

	public AddressRequestEntity setId(long id) {
		this.id = id;
		return this;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public AddressRequestEntity setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
		return this;
	}

	public String getQuery() {
		return query;
	}

	public AddressRequestEntity setQuery(String query) {
		this.query = query;
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
