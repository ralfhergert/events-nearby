import {LocalEvent} from '../model/LocalEvent';
import {ErrorListener} from '../view/ErrorListener';
import {LocalizableTextListWidget} from '../widget/LocalizableTextListWidget';
import {LocalizableFieldType} from '../widget/LocalizableTextListWidget';
import {LocationWidget} from '../widget/LocationWidget';
import {DateFieldWidget} from '../widget/DateFieldWidget';
import {DateHelper} from '../util/DateHelper';
import {SubmitScheduler} from './SubmitScheduler';
import {SubmitAction} from './SubmitAction';
import {ValidationDoneListener} from './ValidationDoneListener';
import {I18n} from '../i18n/I18n';

export class CreateEventAction implements SubmitAction {
	private $target: any; // should be a jQuery node.
	private i18n: I18n;
	private errorListener: Array<ErrorListener> = [];
	private validationDoneListener: Array<ValidationDoneListener> = [];
	private scheduler: SubmitScheduler;
	private eventTitleWidget: LocalizableTextListWidget;
	private eventDescriptionWidget: LocalizableTextListWidget;
	private startDateWidget: DateFieldWidget;

	constructor($target: any, i18n: I18n) {
		let thisObj = this;
		this.i18n = i18n;
		this.scheduler = new SubmitScheduler(this);
		this.$target = $target;
		// register a click listener on the submit button.
		$target.find('#submit').click(function() {
			// ignore this click. if a submit request has already been scheduled.
			if (!jQuery(this).hasClass('waiting')) {
				jQuery(this).addClass('waiting');
				thisObj.scheduler.scheduleSubmit();
			}
		});
		this.eventTitleWidget = new LocalizableTextListWidget(jQuery('#event-title'), LocalizableFieldType.Input, 'title', i18n);
		this.eventDescriptionWidget = new LocalizableTextListWidget(jQuery('#event-description'), LocalizableFieldType.Textarea, 'description', i18n);
		this.startDateWidget = new DateFieldWidget(jQuery('#event-startDate'), i18n, DateHelper.createOffsetDate(24 * 3600)); // plus 24h
		// register a change listener on the form.
		$target.on('change', '[name]', function() {
			thisObj.scheduler.scheduleValidation();
		});
		$target.on('keypress', '[name]', function(event: any) {
			// ignore any control keys (cursor, tab, pos1, end, enter), but respect backspace and delete
			if (event.charCode != 0 || event.key === 'Delete' || event.key === 'Backspace') {
				thisObj.scheduler.scheduleValidation(1000); // 1 second
			}
		});
		// trigger a first submit to get all validations.
		this.scheduler.scheduleValidation();
	}

	public addErrorListener(listener: ErrorListener): void {
		this.errorListener.push(listener);
	}

	public addValidationDoneListener(listener: ValidationDoneListener): void {
		this.validationDoneListener.push(listener);
	}

	private extractFormValues(): LocalEvent {
		let localEvent = new LocalEvent();
		localEvent.title = this.eventTitleWidget.getValues();
		localEvent.description = this.eventDescriptionWidget.getValues();
		localEvent.image = this.$target.find('input#event-image').val();
		localEvent.location = this.$target.find('#event-location-input').val();
		localEvent.startDate = this.startDateWidget.date();
		localEvent.duration = this.$target.find('#event-duration').val();
		return localEvent;
	}

	public submit(validateOnly = false) {
		let thisObj = this;
		// clear the current window handle, if there is any.
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
				// inform all validation listeners.
				thisObj.validationDoneListener.forEach(listener => { listener.validationDone(); });
				// re-enable the submit button if this was a submit request.
				if (!validateOnly) {
					thisObj.$target.find('input[type="submit"]').removeClass('waiting');
				}
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
							let $field = thisObj.$target.find('[name="' + error['field'] + '"]')
								.not('[data-ignore-validation-error-' + error['code'] + ']');
							if ($field.length > 0) {
								$field.removeClass('validation-ok').addClass('validation-error');
								// render a validation message after this field.
								let $message = thisObj.$target.find('[data-name="' + error['field'] + '"].validation-message');
								if ($message.length > 0) {
									$message.removeClass('unconfirmed');
								} else {
									$message = jQuery('<span class="validation-message">').hide().attr('data-name', error['field']).insertAfter($field);
								}
								$message.text(thisObj.i18n.get('createEventForm_validation_' + error['code'], {}, error['defaultMessage'])).slideDown();
							}
						});
						// remove all oks from children which belong to invalid parents.
						thisObj.$target.find('.validation-error .validation-ok').removeClass('validation-ok');
						// remove all unconfirmed validation-messages.
						thisObj.$target.find('.validation-message.unconfirmed').slideUp();
					}
					// inform all validation listeners.
					thisObj.validationDoneListener.forEach(listener => { listener.validationDone(); });
					// re-enable the submit button if this was a submit request.
					if (!validateOnly) {
						thisObj.$target.find('input[type="submit"]').removeClass('waiting');
					}
				} else { // other error case like connection issues.
					thisObj.errorListener.forEach(listener => { listener.showError('Could not reach server. Will try again...'); });
					thisObj.$target.find('#submit').removeClass('armed').addClass('unarmed');
					// retry
					if (validateOnly) {
						thisObj.scheduler.scheduleValidation(10000);
					} else {
						thisObj.scheduler.scheduleSubmit(10000);
					}
				}
			},
			complete: function() {
				// remove validation-ok from all elements which should only show error-messages.
				thisObj.$target.find('.showOnlyValidationErrors.validation-ok').removeClass('validation-ok');
			}
		});
	}
}
