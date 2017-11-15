package org.nextup.backend.entity;

import org.hibernate.validator.constraints.NotEmpty;
import org.nextup.backend.to.LocalizableString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.net.URL;
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
	private URL image;
	private String address;
	@NotNull
	private Date startDate;
	@NotNull
	private Date endDate;

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

	public URL getImage() {
		return image;
	}

	public void setImage(URL image) {
		this.image = image;
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

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
