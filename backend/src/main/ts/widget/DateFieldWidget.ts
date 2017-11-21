/**
 * This widget allows a user to pick a date and time with respect to the timezone.
 */
export class DateFieldWidget {
	readonly $target: any; // supposed to be a jQuery node.
	readonly $input: any;
	readonly $feedback: any;

	constructor($target: any, date = new Date()) {
		let thisObj = this;
		this.$target = $target.addClass('dateFieldWidget');
		this.$input = jQuery('<input type="text"/>')
			.val(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
			.appendTo($target);
		if ($target.attr('data-input-id')) {
			this.$input.attr('id', $target.attr('data-input-id'));
		}
		if ($target.attr('data-name')) {
			this.$input.attr('name', $target.attr('data-name'));
		}
		this.$feedback = jQuery('<div class="feedback">').appendTo($target);
		this.$input.change(function() {
			thisObj.updateFeedback();
		});
		this.updateFeedback();
	}

	protected updateFeedback(): void {
		let date = this.date();
		if (date != null && date.toString() != 'Invalid Date') {
			this.$feedback.text(date.toLocaleDateString() + ' ' + date.toTimeString())
				.removeClass('validation-error')
				.addClass('validation-ok');
		} else {
			this.$feedback.text('Could not parse your date. Expected pattern is: yyyy-mm-dd HH:MM')
				.removeClass('validation-ok')
				.addClass('validation-error');
		}
	}

	public date(): Date {
		return new Date(this.$input.val());
	}
}
