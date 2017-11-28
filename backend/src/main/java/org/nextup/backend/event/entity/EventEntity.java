package org.nextup.backend.event.entity;

import org.hibernate.validator.constraints.NotEmpty;
import org.nextup.backend.geocoder.entity.AddressEntity;
import org.nextup.backend.event.to.LocalizableString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * This entity maps event to be stored in a database.
 */
@Entity
public class EventEntity { //extends AbstractPersistable<UUID> {

	@Id
	@GeneratedValue
	private UUID id;
	@NotEmpty
	private LocalizableString title;
	private LocalizableString description;
	private UUID imageId;
	private String address;
	@NotNull
	private Date startDate;
	private String duration;
	@OneToOne(cascade = CascadeType.ALL)
	private AddressEntity resolvedAddress;

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public LocalizableString getTitle() {
		return title;
	}

	public void setTitle(LocalizableString title) {
		this.title = title;
	}

	public LocalizableString getDescription() {
		return description;
	}

	public void setDescription(LocalizableString description) {
		this.description = description;
	}

	public UUID getImageId() {
		return imageId;
	}

	public void setImageId(UUID imageId) {
		this.imageId = imageId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public AddressEntity getResolvedAddress() {
		return resolvedAddress;
	}

	public void setResolvedAddress(AddressEntity resolvedAddress) {
		this.resolvedAddress = resolvedAddress;
	}
}
