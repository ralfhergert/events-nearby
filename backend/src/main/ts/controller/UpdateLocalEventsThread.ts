import {LocalEvent} from '../model/LocalEvent';
import {ErrorListener} from "../view/ErrorListener";

export class UpdateLocalEventsThread {
	private eventsListener: Array<LocalEventsListener> = [];
	private errorListener: Array<ErrorListener> = [];
	private timeoutHandle: number;

	public queryLocalEvents(): void {
		let thisObj = this;
		// clear the current window handle, if there is any.
		window.clearTimeout(this.timeoutHandle);
		jQuery.ajax('/api/events', {
			success: function(data: Array<LocalEvent>, textStatus: string, jqXHR: any) {
				// inform all error listeners that everything is ok.
				thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
				// info all listeners
				thisObj.eventsListener.forEach(listener => { listener.updateEvents(data); });
			},
			error: function() {
				// inform all error listener that we currently have errors.
				thisObj.errorListener.forEach(listener => { listener.showError('Could not update events from server. Will try again...'); });
			},
			complete: function() {
				// create a new timeout
				thisObj.timeoutHandle = window.setTimeout(function() { thisObj.queryLocalEvents(); }, 30000); // 30s
			}
		});
	}

	public addLocalEventListener(listener: LocalEventsListener): void {
		this.eventsListener.push(listener);
	}

	public addErrorListener(listener: ErrorListener): void {
		this.errorListener.push(listener);
	}
}

export interface LocalEventsListener {
	updateEvents(events: Array<LocalEvent>);
}
