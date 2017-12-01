import {LocalEvent} from '../model/LocalEvent';
import {RequestController} from './RequestController';
import {I18n} from '../i18n/I18n';
import {GPSLocation} from '../model/GPSLocation';

export class UpdateLocalEventsThread extends RequestController<Array<LocalEvent>,GPSLocation> {

	constructor(i18n: I18n) {
		super('/api/events', i18n);
	}

	protected getRequestQuery(location: GPSLocation): string {
		if (location != null) {
			return '?lat=' + location.lat + '&lon=' + location.lon;
		}
		return '';
	}
}
