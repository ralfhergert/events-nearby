package org.nextup.backend.image.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

/**
 * This entity stores images
 */
@Entity
public class ImageEntity {

	@Id
	@GeneratedValue
	private UUID id;
	@NotNull
	@Column(length = 0) // do not restrict the column size (necessary for H2)
	private byte[] image;
	@NotNull
	private Date createdDate = new Date();

	public UUID getId() {
		return id;
	}

	public ImageEntity setId(UUID id) {
		this.id = id;
		return this;
	}

	public byte[] getImage() {
		return image;
	}

	public ImageEntity setImage(byte[] image) {
		this.image = image;
		return this;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public ImageEntity setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
		return this;
	}
}
