import {SubmitAction} from './SubmitAction';

/**
 * This class help actions with scheduling asynchronous submit- or validation-requests.
 */
export class SubmitScheduler {
	readonly action: SubmitAction;
	private validationTimeoutHandle: number;
	private submitTimeoutHandle: number;

	constructor(action: SubmitAction) {
		this.action = action;
	}

	public scheduleValidation(delay = 0) {
		let thisObj = this;
		// kill the previous timeout.
		window.clearTimeout(this.validationTimeoutHandle);
		this.validationTimeoutHandle = window.setTimeout(function() {
			window.clearTimeout(thisObj.validationTimeoutHandle);
			thisObj.action.submit(true);
		}, delay);
	}

	public scheduleSubmit(delay = 0) {
		let thisObj = this;
		// kill the previous timeout.
		window.clearTimeout(this.submitTimeoutHandle);
		this.submitTimeoutHandle = window.setTimeout(function() {
			window.clearTimeout(thisObj.validationTimeoutHandle);
			window.clearTimeout(thisObj.submitTimeoutHandle);
			thisObj.action.submit(false);
		}, delay);

	}
}
