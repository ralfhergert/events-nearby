package org.nextup.backend.image.service;

import org.nextup.backend.image.entity.ImageEntity;
import org.nextup.backend.image.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * This controller helps with uploading and delivering images.
 */
@RestController
public class ImageController {

	@Autowired
	private ImageRepository imageRepository;

	@RequestMapping(path = "api/image", method = RequestMethod.POST)
	public UUID uploadImage(@NotNull @RequestBody byte[] image) {
		ImageEntity entity = new ImageEntity().setImage(image);
		return imageRepository.save(entity).getId();
	}

	@RequestMapping(path = "api/image/{id}", method = RequestMethod.GET)
	public byte[] uploadImage(@NotNull @PathVariable("id") UUID id) {
		return imageRepository.findById(id)
			.map(ImageEntity::getImage)
			.orElse(null);
	}

	@RequestMapping(path = "api/image/{id}", method = RequestMethod.DELETE)
	public void deleteImage(@NotNull @PathVariable("id") UUID id) {
		// TODO check ownership
		imageRepository.findById(id)
			.ifPresent(entity -> imageRepository.delete(entity));
	}
}
