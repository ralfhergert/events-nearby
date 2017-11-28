import {LocalEvent} from '../model/LocalEvent';
import {RequestController} from './RequestController';
import {I18n} from '../i18n/I18n';

export class UpdateLocalEventsThread extends RequestController<Array<LocalEvent>,any> {

	constructor(i18n: I18n) {
		super('/api/events', i18n);
	}
}
