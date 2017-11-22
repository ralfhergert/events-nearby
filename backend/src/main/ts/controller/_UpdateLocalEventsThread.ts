import {LocalEvent} from '../model/LocalEvent';
import {RequestController} from './RequestController';

export class UpdateLocalEventsThread extends RequestController<Array<LocalEvent>,any> {

	constructor() {
		super('/api/events', 'Could not update events from server. Waiting for the server to be reachable...');
	}
}
