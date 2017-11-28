package org.nextup.backend.event.to;

import java.util.HashMap;

/**
 * This transfer object is a map of locale ids to the string in this language.
 */
public class LocalizableString extends HashMap<String,String> {

	public LocalizableString add(String locale, String content) {
		put(locale, content);
		return this;
	}
}
