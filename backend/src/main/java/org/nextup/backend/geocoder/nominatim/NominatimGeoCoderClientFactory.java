package org.nextup.backend.geocoder.nominatim;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This factory registers an instance of {@link NominatimGeoCoderClient} as bean.
 */
@Configuration
public class NominatimGeoCoderClientFactory {

	@Bean
	public NominatimGeoCoderClientFactory createInstance() {
		return new NominatimGeoCoderClientFactory();
	}
}
