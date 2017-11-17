import {LocalEvent} from '../model/LocalEvent';
import {ErrorListener} from '../view/ErrorListener';
import {LocalizableTextListWidget} from '../widget/LocalizableTextListWidget';
import {LocalizableFieldType} from '../widget/LocalizableTextListWidget';
import {LocationWidget} from '../widget/LocationWidget';
import {DateFieldWidget} from '../widget/DateFieldWidget';
import {DateHelper} from '../util/DateHelper';

export class CreateEventAction {
	private $target: any; // should be a jQuery node.
	private errorListener: Array<ErrorListener> = [];
	private timeoutHandle: number;
	private eventTitleWidget: LocalizableTextListWidget;
	private eventDescriptionWidget: LocalizableTextListWidget;
	private eventLocationWidget: LocationWidget;
	private startDateWidget: DateFieldWidget;
	private endDateWidget: DateFieldWidget;

	constructor($target: any) {
		let thisObj = this;
		this.$target = $target;
		// register a click listener on the submit button.
		$target.find('#submit').click(function() {
			thisObj.submit();
		});
		this.eventTitleWidget = new LocalizableTextListWidget(jQuery('#event-title'), LocalizableFieldType.Input, 'title');
		this.eventDescriptionWidget = new LocalizableTextListWidget(jQuery('#event-description'), LocalizableFieldType.Textarea, 'description');
		this.eventLocationWidget = new LocationWidget(jQuery('#event-location'), 'location');
		this.startDateWidget = new DateFieldWidget(jQuery('#event-startDate'), DateHelper.createOffsetDate(24 * 3600)); // plus 24h
		this.endDateWidget = new DateFieldWidget(jQuery('#event-endDate'), DateHelper.createOffsetDate(26 * 3600)); // plus 26h
		// register a change listener on the form.
		$target.on('change', '[name]', function() {
			thisObj.submit(true);
		});
		// trigger a first submit to get all validations.
		this.submit(true);
	}

	public addErrorListener(listener: ErrorListener): void {
		this.errorListener.push(listener);
	}

	private extractFormValues(): LocalEvent {
		let localEvent = new LocalEvent();
		localEvent.title = this.eventTitleWidget.getValues();
		localEvent.description = this.eventDescriptionWidget.getValues();
		localEvent.image = this.$target.find('input#event-image').val();
		localEvent.location = this.eventLocationWidget.getValues();
		localEvent.startDate = this.startDateWidget.date()
		localEvent.endDate = this.endDateWidget.date();
		return localEvent;
	}

	public submit(validateOnly = false) {
		let thisObj = this;
		// clear the current window handle, if there is any.
		window.clearTimeout(this.timeoutHandle);
		jQuery.ajax('/api/event' + (validateOnly ? '?validateOnly=true' : ''), {
			method  : 'POST',
			data    : JSON.stringify(this.extractFormValues()),
			contentType: 'application/json',
			dataType: 'json',
			success : function() {
				thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
				// all ok - remove validation messages
				thisObj.$target.find('[name]').removeClass('validation-error').addClass('validation-ok');
				thisObj.$target.find('#submit').removeClass('unarmed').addClass('armed');
				thisObj.$target.find('.validation-message').slideUp();
			},
			error: function(jqXHR: any, status: string, error: string) {
				if (jqXHR.status == 400) { // BadRequest due to validation errors.
					thisObj.errorListener.forEach(listener => { listener.resumeToNormal(); });
					thisObj.$target.find('#submit').removeClass('armed').addClass('unarmed');
					// check the individual errors
					let response = JSON.parse(jqXHR.responseText);
					if (response != null && response['errors'] != null) {
						// set all fields ok.
						thisObj.$target.find('[name]').removeClass('validation-error').addClass('validation-ok');
						// mark all existing validation messages.
						thisObj.$target.find('.validation-message').addClass('unconfirmed');
						// mark all fields which got still complains.
						response['errors'].forEach(error => {
							if (!error['field'] && error['code'] === 'ScriptAssert') {
								if (error['defaultMessage'] === 'endDate not after startDate') {
									error['field'] = 'endDate';
								}
							}
							let $field = thisObj.$target.find('[name="' + error['field'] + '"]')
								.not('[data-ignore-validation-error-' + error['code'] + ']')
								.removeClass('validation-ok')
								.addClass('validation-error');
							// render a validation message after this field.
							let $message = thisObj.$target.find('[data-name="' + error['field'] + '"].validation-message');
							if ($message.length > 0) {
								$message.removeClass('unconfirmed');
							} else {
								$message = jQuery('<span class="validation-message">').hide().attr('data-name', error['field']).insertAfter($field);
							}
							$message.text(error['defaultMessage']).slideDown();
						});
						// remove all oks from children which belong to invalid parents.
						thisObj.$target.find('.validation-error .validation-ok').removeClass('validation-ok');
						// remove all unconfirmed validation-messages.
						thisObj.$target.find('.validation-message.unconfirmed').slideUp();
					}
				} else { // other error case like connection issues.
					thisObj.errorListener.forEach(listener => { listener.showError('Could not reach server. Will try again...'); });
					thisObj.$target.find('#submit').removeClass('armed').addClass('unarmed');
					// retry
					thisObj.timeoutHandle = window.setTimeout(function() { thisObj.submit(validateOnly); }, 10000); // 10s
				}
			},
			complete: function() {
				// remove validation-ok from all elements which should only show error-messages.
				thisObj.$target.find('.showOnlyValidationErrors.validation-ok').removeClass('validation-ok');
			}
		});
	}
}
