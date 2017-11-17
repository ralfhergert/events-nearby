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
		jQuery('<span class="explanation">').text('Expected format is yyyy-mm-dd HH:MM').appendTo($target);
		this.$input = jQuery('<input type="text"/>')
			.val(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
			.appendTo($target);
		if ($target.attr('data-name')) {
			this.$input.attr('name', $target.attr('data-name'));
		}
		this.$feedback = jQuery('<span class="feedback">').appendTo($target);
		this.$input.change(function() {
			thisObj.updateFeedback();
		});
		this.updateFeedback();
	}

	protected updateFeedback(): void {
		let date = this.date();
		if (date != null && date.toString() != 'Invalid Date') {
			this.$feedback.text(date.toLocaleDateString() + ' ' + date.toTimeString());
		} else {
			this.$feedback.text('Input does not match the required pattern.');
		}
	}

	public date(): Date {
		return new Date(this.$input.val());
	}
}
