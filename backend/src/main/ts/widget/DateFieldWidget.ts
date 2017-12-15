import {I18n} from '../i18n/I18n';
import {ValidationHelper} from '../util/ValidationHelper';
/**
 * This widget allows a user to pick a date and time with respect to the timezone.
 */
export class DateFieldWidget {
	readonly i18n: I18n;
	readonly $target: any; // supposed to be a jQuery node.
	readonly $input: any;
	readonly $feedback: any;

	constructor($target: any, i18n: I18n, date = new Date()) {
		let thisObj = this;
		this.i18n = i18n;
		this.$target = $target.addClass('dateFieldWidget').addClass('input-container');
		this.$input = jQuery('<input type="text"/>')
			.val(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
			.appendTo($target);
		if ($target.attr('data-input-id')) {
			this.$input.attr('id', $target.attr('data-input-id'));
		}
		if ($target.attr('data-name')) {
			this.$input.attr('name', $target.attr('data-name'));
		}
		jQuery('<label class="validation-message">')
			.attr('for', $target.attr('data-input-id'))
			.attr('data-name', $target.attr('data-name'))
			.appendTo($target);
		this.$feedback = jQuery('<div class="feedback">').appendTo($target);
		this.$input.change(function() {
			thisObj.updateFeedback();
		}).keypress(function(event: any) {
			// ignore any control keys (cursor, tab, pos1, end, enter), but respect backspace and delete
			if (event.charCode != 0 || event.key === 'Delete' || event.key === 'Backspace') {
				window.setTimeout(function() {
					thisObj.updateFeedback();
				});
			}
		});
		this.updateFeedback();
	}

	protected updateFeedback(): void {
		let date = this.date();
		if (date == null || date.toString() == 'Invalid Date') {
			ValidationHelper.markInvalidWithText(this.$feedback, this.i18n.get('createEventForm_feedback_couldNotParseDate'));
		} else if (date.getTime() < new Date().getTime()) {
			ValidationHelper.markInvalidWithText(this.$feedback, this.i18n.get('createEventForm_validation_Future'));
		} else {
			ValidationHelper.markValid(this.$feedback.text(date.toLocaleDateString() + ' ' + date.toTimeString()));
		}
	}

	public date(): Date {
		return new Date(this.$input.val());
	}
}
