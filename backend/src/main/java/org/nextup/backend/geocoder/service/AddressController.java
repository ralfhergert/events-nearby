package org.nextup.backend.geocoder.service;

import org.nextup.backend.geocoder.entity.AddressEntity;
import org.nextup.backend.geocoder.entity.AddressRequestEntity;
import org.nextup.backend.geocoder.nominatim.CommunicationException;
import org.nextup.backend.geocoder.nominatim.NominatimGeoCoderClient;
import org.nextup.backend.geocoder.nominatim.dto.SearchResult;
import org.nextup.backend.geocoder.repository.AddressRequestRepository;
import org.nextup.backend.geocoder.to.Address;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * This AddressController translates addresses into GPS coordinates with the help of geo-coding-services.
 * It uses also a cache to avoid request the same address twice.
 */
@RestController
public class AddressController {

	private static final Logger Log = LoggerFactory.getLogger(AddressController.class);

	@Value("${addressController.minimumQueryLength}")
	private int minimumQueryLength;
	@Value("${addressController.allowedCachingAgeInSeconds}")
	private long allowedCachingAgeInSeconds;

	@Autowired
	private AddressRequestRepository addressRequestRepository;

	@Autowired
	private NominatimGeoCoderClient geoCoderClient;

	@RequestMapping(path = "api/address", method = RequestMethod.GET)
	public Address resolveAddress(@RequestParam(value="query", required = true) final String query) {
		if (query == null) {
			return null;
		}
		final String trimmedQuery = query.trim();
		// skip this request if the given query is too short.
		if (trimmedQuery.length() < minimumQueryLength) {
			return null;
		}
		// also skip this query if it does not contain at least one white-space.
		if (!trimmedQuery.contains(" ")) {
			return null;
		}
		// search the cached requests.
		AddressRequestEntity cachedRequest = addressRequestRepository.findByQuery(trimmedQuery);
		// if no request was found or the found request is too old, then use the GeoCoder to resolve it.
		if (cachedRequest == null) {
			cachedRequest = new AddressRequestEntity()
				.setQuery(trimmedQuery)
				.setCreatedDate(new Date(0)); // set a date which is definitively too old.
		}
		// if the request is too old, then refresh it.
		if (new Date().getTime() - cachedRequest.getCreatedDate().getTime() > allowedCachingAgeInSeconds * 1000) {
			try {
				cachedRequest.setAddress(convert(geoCoderClient.resolve(trimmedQuery)));
				cachedRequest.setCreatedDate(new Date());
				try { // try to store the updated request. Due to concurrency it may happen, that another thread
					addressRequestRepository.save(cachedRequest);
				} catch (DataIntegrityViolationException e) {
					Log.warn("could not save updated cached request", e);
				}
			} catch (CommunicationException e) {
				Log.error("request to GeoCoder failed", e);
			}
		}
		// deliver the resolved address.
		return cachedRequest.getAddress() != null ? new Address(cachedRequest.getAddress()) : null;
	}

	protected AddressEntity convert(SearchResult result) {
		if (result == null) {
			return null;
		}
		AddressEntity entity = new AddressEntity()
			.setLat(result.getLat())
			.setLon(result.getLon());
		if (result.getAddress() != null) {
			entity
				.setCountry(result.getAddress().getCountry())
				.setCountryCode(result.getAddress().getCountryCode())
				.setState(result.getAddress().getState())
				.setCity(result.getAddress().getCity())
				.setPostcode(result.getAddress().getPostcode())
				.setStreet(result.getAddress().getRoad())
				.setHouseNumber(result.getAddress().getHouseNumber());
		}
		return entity;
	}
}
