package org.nextup.backend.geocoder.nominatim.dto;

import java.util.ArrayList;

/**
 * This DTO resembles the bounding-box of a {@link SearchResult} from nominatim.
 * See <a href="https://wiki.openstreetmap.org/wiki/Nominatim">Nominatim Wiki</a>
 */
public class BoundingBox extends ArrayList<Double> {

	public Double getMinLat() {
		return size() > 1 ? get(0) : null;
	}

	public Double getMaxLat() {
		return size() > 2 ? get(1) : null;
	}

	public Double getMinLon() {
		return size() > 3 ? get(2) : null;
	}

	public Double getMaxLon() {
		return size() > 4 ? get(3) : null;
	}
}
