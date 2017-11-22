package org.nextup.backend.geocoder.nominatim;

/**
 * This exception is raised, when the geo-coding-client had a communication issue
 * and could not reach or understand the servers response.
 */
public class CommunicationException extends Exception {

	public CommunicationException(String message) {
		super(message);
	}

	public CommunicationException(String message, Throwable cause) {
		super(message, cause);
	}
}
