/**
 * This class help actions with scheduling asynchronous submit- or validation-requests.
 */
export class UniversalScheduler {
	readonly registeredFunction: Function;
	private timeoutHandle: number;

	constructor(registeredFunction: Function) {
		this.registeredFunction = registeredFunction;
	}

	public schedule(delay = 0) {
		let thisObj = this;
		// kill the previous timeout.
		window.clearTimeout(this.timeoutHandle);
		this.timeoutHandle = window.setTimeout(function() {
			window.clearTimeout(thisObj.timeoutHandle);
			thisObj.registeredFunction.call(thisObj);
		}, delay);
	}
}
