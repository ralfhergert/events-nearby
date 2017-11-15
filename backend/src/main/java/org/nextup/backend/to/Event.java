package org.nextup.backend.to;

import org.nextup.backend.entity.EventEntity;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

/**
 * This transfer object transports an event.
 */
public class Event {

	private UUID id;
	private LocalizableString title;
	private LocalizableString description;
	private URL image;
	private Location location;
	private Date startDate;
	private Date endDate;

	public Event() {}

	public Event(EventEntity entity) {
		id = entity.getId();
		title = entity.getTitle();
		description = entity.getDescription();
		image = entity.getImage();
		location = new Location().setAddress(entity.getAddress());
		startDate = entity.getStartDate();
		endDate = entity.getEndDate();
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

	public Date getEndDate() {
		return endDate;
	}

	public Event setEndDate(Date endDate) {
		this.endDate = endDate;
		return this;
	}
}
