package org.nextup.backend.image.repository;

import org.nextup.backend.image.entity.ImageEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

/**
 * Repository for images.
 */
public interface ImageRepository extends CrudRepository<ImageEntity, UUID> {}
