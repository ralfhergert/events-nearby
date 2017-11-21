package org.nextup.backend.to;

import org.hibernate.validator.constraints.NotEmpty;
import org.nextup.backend.entity.EventEntity;
import org.nextup.backend.geocoder.to.Address;
import org.nextup.backend.validation.NoEmptyValues;

import javax.validation.Valid;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

/**
 * This transfer object transports an event.
 */
public class Event {

	private UUID id;
	@NotNull
	@NotEmpty
	@NoEmptyValues
	private LocalizableString title;
	@NotNull
	@NotEmpty
	@NoEmptyValues
	private LocalizableString description;
	private URL image;
	@NotNull
	@Valid
	private Location location;
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
		image = entity.getImage();
		location = new Location().setAddress(entity.getAddress());
		startDate = entity.getStartDate();
		duration = entity.getDuration();
		resolvedAddress = new Address(entity.getResolvedAddress());
	}

	public UUID getId() {
		return id;
	}

	public Event setId(UUID id) {
		this.id = id;
		return this;
	}

	public LocalizableString getTitle() {
		return title;
	}

	public Event setTitle(LocalizableString title) {
		this.title = title;
		return this;
	}

	public LocalizableString getDescription() {
		return description;
	}

	public Event setDescription(LocalizableString description) {
		this.description = description;
		return this;
	}

	public URL getImage() {
		return image;
	}

	public Event setImage(URL image) {
		this.image = image;
		return this;
	}

	public Location getLocation() {
		return location;
	}

	public Event setLocation(Location location) {
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
