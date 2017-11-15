import {LocalEvent} from '../model/LocalEvent';
import {LocalEventsListener} from '../controller/UpdateLocalEventsThread';
import {ErrorListener} from "../controller/UpdateLocalEventsThread";

export class UpdateErrorView implements ErrorListener {
	private $target: any; // should be a jQuery node.
	private isShowingError: boolean = false;

	constructor($target: any) {
		this.$target = $target;
	}

	showError(): void {
		if (!this.isShowingError) {
			this.$target.hide().append(jQuery('<span class="message">').text('Could not update events from server. Will try again...')).slideDown();
			this.isShowingError = true;
		}
	}

	resumeToNormal(): void {
		var thisObj = this;
		if (this.isShowingError) {
			this.$target.slideUp(function() { thisObj.$target.empty(); });
			this.isShowingError = false;
		}
	}
}
