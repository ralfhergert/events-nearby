package org.nextup.backend.geocoder.repository;

import org.nextup.backend.geocoder.entity.AddressRequestEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * This repository enables querying and persisting events.
 */
public interface AddressRequestRepository extends CrudRepository<AddressRequestEntity, Long> {

	AddressRequestEntity findByQuery(String query);
}
