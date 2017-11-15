import {LocalEvent} from '../model/LocalEvent';
import {ErrorListener} from '../view/ErrorListener';

export class CreateEventAction {
	private $target: any; // should be a jQuery node.
	private errorListener: Array<ErrorListener> = [];
	private timeoutHandle: number;

	constructor($target: any) {
		let thisObj = this;
		this.$target = $target;
		// register a click listener on the submit button.
		$target.find('#submit').click(function() {
			thisObj.submit();
		});
		// register a change listener on the inputs.
		$target.find('[name]').change(function() {
			thisObj.submit(true);
		});
		this.submit(true);
	}

	public addErrorListener(listener: ErrorListener): void {
		this.errorListener.push(listener);
	}

	private extractFormValues(): LocalEvent {
		let localEvent = new LocalEvent();
		localEvent.title = this.$target.find('input#event-title').val();
		localEvent.description = this.$target.find('textarea#event-description').val();
		localEvent.image = this.$target.find('input#event-image').val();
		localEvent.location = this.$target.find('input#event-location').val();
		localEvent.startDate = this.$target.find('input#event-startDate').val();
		localEvent.endDate = this.$target.find('input#event-endDate').val();
		return localEvent;
	}

	public submit(validateOnly = false) {
		let thisObj = this;
		// clear the current window handle, if there is any.
		window.clearTimeout(this.timeoutHandle);
		jQuery.ajax('/api/event' + (validateOnly ? '?validateOnly=true' : ''), {
			method : 'POST',
			data   : this.extractFormValues(),
			success: function() {
				thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
				// all ok - remove validation messages
				thisObj.$target.find('[name]').removeClass('validation-error').addClass('validation-ok');
				thisObj.$target.find('#submit').removeClass('unarmed').addClass('armed');
			},
			error: function(jqXHR: any, status: string, error: string) {
				if (jqXHR.status == 400) { // BadRequest due to validation errors.
					thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
					thisObj.$target.find('#submit').removeClass('armed').addClass('unarmed');
					// check the individual errors
					let response = JSON.parse(jqXHR.responseText);
					if (response != null && response['errors'] != null) {
						response['errors'].forEach(error => {
							thisObj.$target.find('[name="' + error['field'] + '"]').removeClass('validation-ok').addClass('validation-error');
						});
					}
				} else { // other error case like connection issues.
					thisObj.errorListener.forEach(listener => { listener.showError('Could not reach server. Will try again...'); });
					thisObj.$target.find('#submit').removeClass('armed').addClass('unarmed');
					// retry
					thisObj.timeoutHandle = window.setTimeout(function() { thisObj.submit(validateOnly); }, 10000); // 10s
				}
			}
		});
	}
}
