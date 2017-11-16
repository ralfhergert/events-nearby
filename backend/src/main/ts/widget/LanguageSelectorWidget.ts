import {Languages} from '../model/Languages';

export class LanguageSelectorWidget {
	readonly $target: any;
	static languages = new Languages();

	constructor(name: string, disabledLanguages: Array<string>, selectionCandidate: string) {
		this.$target = jQuery('<select class="languageSelector">').attr('name', name);
		// render all options.
		for (let language in LanguageSelectorWidget.languages) {
			jQuery('<option>')
				.attr('value', language)
				.text(LanguageSelectorWidget.languages[language])
				.attr('disabled', disabledLanguages.indexOf(language) > -1 ? 'disabled' : null)
				.appendTo(this.$target);
		}
		if (disabledLanguages.indexOf(selectionCandidate) < 0) {
			this.$target.val(selectionCandidate);
		}
	}

	public value(): string {
		return this.$target.val();
	}

	public updateDisabledLanguages(disabledLanguages: Array<string>) {
		// remove disabled-state from all options which no longer belong to the disabled languages.
		this.$target.find('[disabled]').each(function() {
			jQuery(this).attr('disabled', disabledLanguages.indexOf(jQuery(this).attr('value')) > -1 ? 'disabled' : null)
		});
		// make sure all option are disable which should be disabled. - do not disable them if they are the currently selected value.
		let currentSelection = this.$target.val();
		for (let language of disabledLanguages) {
			if (language !== currentSelection) {
				this.$target.children('option[value="' + language + '"]').attr('disabled', 'disabled');
			}
		}
	}
}
