import {Languages} from '../model/Languages';

export class LanguageSelectorWidget {
	readonly $target: any;
	static languages = new Languages();

	constructor(name: string) {
		this.$target = jQuery('<select class="languageSelector">').attr('name', name);
		// render all options.
		for (let language in LanguageSelectorWidget.languages) {
			jQuery('<option>')
				.attr('value', language)
				.text(LanguageSelectorWidget.languages[language])
				.appendTo(this.$target);
		}
	}

	public value(): string {
		return this.$target.val();
	}
}
