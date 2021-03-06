package org.nextup.backend.event.to;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;
import org.nextup.backend.event.entity.EventEntity;
import org.nextup.backend.geocoder.to.Address;
import org.nextup.backend.validation.NoEmptyValues;
import org.nextup.backend.validation.ResolvableAddress;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

/**
 * This transfer object transports an event.
 */
public class Event {

	private UUID id;
	@NotNull
	@NotEmpty
	@NoEmptyValues
	private Map<String,String> title;
	@NotNull
	@NotEmpty
	@NoEmptyValues
	private Map<String,String> description;
	private UUID imageId;
	@NotBlank
	@Size(max = 160)
	@ResolvableAddress
	private String location;
	@NotNull
	@Future
	private Date startDate;
	private String duration;
	private Address resolvedAddress;

	public Event() {}

	public Event(EventEntity entity) {
		id = entity.getId();
		title = entity.getTitle();
		description = entity.getDescription();
		imageId = entity.getImageId();
		location = entity.getAddress();
		startDate = entity.getStartDate();
		duration = entity.getDuration();
		resolvedAddress = entity.getResolvedAddress() != null ? new Address(entity.getResolvedAddress()) : null;
	}

	public UUID getId() {
		return id;
	}

	public Event setId(UUID id) {
		this.id = id;
		return this;
	}

	public Map<String,String> getTitle() {
		return title;
	}

	public Event setTitle(LocalizableString title) {
		this.title = title;
		return this;
	}

	public Map<String,String> getDescription() {
		return description;
	}

	public Event setDescription(LocalizableString description) {
		this.description = description;
		return this;
	}

	public UUID getImageId() {
		return imageId;
	}

	public Event setImageId(UUID imageId) {
		this.imageId = imageId;
		return this;
	}

	public String getLocation() {
		return location;
	}

	public Event setLocation(String location) {
		this.location = location;
		return this;
	}

	public Date getStartDate() {
		return startDate;
	}

	public Event setStartDate(Date startDate) {
		this.startDate = startDate;
		return this;
	}

	public String getDuration() {
		return duration;
	}

	public Event setDuration(String duration) {
		this.duration = duration;
		return this;
	}

	public Address getResolvedAddress() {
		return resolvedAddress;
	}

	public Event setResolvedAddress(Address resolvedAddress) {
		this.resolvedAddress = resolvedAddress;
		return this;
	}
}
