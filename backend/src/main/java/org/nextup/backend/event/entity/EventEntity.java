package org.nextup.backend.event.entity;

import org.hibernate.validator.constraints.NotEmpty;
import org.nextup.backend.geocoder.entity.AddressEntity;
import org.nextup.backend.event.to.LocalizableString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Map;
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
	@ElementCollection
	@MapKeyColumn(name = "language", length = 2)
	@Column(name="content", length = 120)
	private Map<String,String> title;
	@NotEmpty
	@ElementCollection
	@MapKeyColumn(name = "language", length = 2)
	@Column(name="content", columnDefinition = "text")
	private Map<String,String> description;
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

	public Map<String,String> getTitle() {
		return title;
	}

	public void setTitle(Map<String,String> title) {
		this.title = title;
	}

	public Map<String,String> getDescription() {
		return description;
	}

	public void setDescription(Map<String,String> description) {
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
