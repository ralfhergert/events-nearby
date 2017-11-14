package org.nextup.backend.repository;

import org.nextup.backend.entity.EventEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

/**
 * This repository enables querying and persisting events.
 */
public interface EventRepository extends CrudRepository<EventEntity, UUID> {
}
