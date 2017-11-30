export class I18n {
	private wordingFileURLPattern = '/i18n/{language}.json'; // this pattern specifies how to load your resource files.
	private currentLanguageRetriever = function(): string { // this function shall return the current UI language to use.
		return navigator.language;
	};
	private messageReplacer = function(message, map): string { // this is the default implementation of the message replacer.
		return message.replace(/\{([^\}]+)\}/g, function(key) {
			return map[key] || key;
		});
	};
	private attributeNameText = 'data-i18n-text';
	private attributeNameValue = 'data-i18n-value';
	private attributeNamePlaceholder = 'data-i18n-placeholder';
	private attributeNameTitle = 'data-i18n-title';
	private wording = {};

	/**
	 * This method triggers loading a language file.
	 * @param language to load. This string is used with the option's wordingFileURLPattern.
	 * @param onLoaded callback which is called when loading is done. If not defined then loading is done with a synchronous request.
	 */
	protected loadLanguageFile(language: string, onLoaded?: Function) {
		let thisObj = this;
		// load the script
		jQuery.ajax({
			url     : this.wordingFileURLPattern.replace('{language}', language),
			dataType: 'json',
			cache   : true, // jQuery should not append the current timestamp.
			async   : typeof onLoaded === 'function', // perform this request only in an asynchronous manner if a callback was given.
			success : function(data, textStatus) {
				thisObj.wording[language] = data;
				if (typeof onLoaded === 'function') {
					onLoaded.call(null, data, textStatus);
				}
			},
			error   : function() {
				// in the error case (for instance if the language file does not exists) we create an empty wording object, to avoid performing the language file request again.
				thisObj.wording[language] = {};
			}
		});
	}

	protected getWordingForLanguage(language: string) {
		// check whether the requested language is currently loaded.
		if (!this.wording[language]) {
			this.loadLanguageFile(language);
		}
		return this.wording[language];
	}

	/**
	 * Returns the wording for the specified key. If the key is not found, the key itself is returned,
	 * unless a defaultValue is defined.
	 *
	 * With the parameter "replacementMap" a JSON object can be specified. The attributes of this object
	 * are then used to fill the placeholders in the message text. The mapReplacer implementation can be
	 * overwritten in the options. The default implementation expects all placeholders to be written in
	 * simple curly brackets, for instance: "He lived in a {color} house."
	 *
	 * @param {Object} key
	 * @param {Object} replacementMap
	 * @param {Object} defaultValue
	 */
	public get(key: string, replacementMap? : any, defaultValue?: string) {
		return this.getForLanguage(this.currentLanguageRetriever(), key, replacementMap, defaultValue);
	}

	public getForLanguage(language: string, key: string, replacementMap? : any, defaultValue?: string) {
		let wording = this.getWordingForLanguage(language) || {};
		let message = wording[key] || (defaultValue === undefined ? key : defaultValue);

		if (replacementMap != null) {
			return this.messageReplacer(message, replacementMap);
		} else {
			return message;
		}
	}

	public apply(targetSelector: any) {
		let thisObj = this;
		jQuery(targetSelector).find('[' + this.attributeNameText + ']').each(function() {
			let i18nKey = jQuery(this).attr(thisObj.attributeNameText) as string;
			jQuery(this).text(thisObj.get(i18nKey));
		});
		jQuery(targetSelector).find('[' + this.attributeNameValue + ']').each(function() {
			let i18nKey = jQuery(this).attr(thisObj.attributeNameValue) as string;
			jQuery(this).val(thisObj.get(i18nKey));
		});
		jQuery(targetSelector).find('[' + this.attributeNamePlaceholder + ']').each(function() {
			let i18nKey = jQuery(this).attr(thisObj.attributeNamePlaceholder) as string;
			jQuery(this).attr('placeholder', thisObj.get(i18nKey));
		});
		jQuery(targetSelector).find('[' + this.attributeNameTitle + ']').each(function() {
			let i18nKey = jQuery(this).attr(thisObj.attributeNameTitle) as string;
			jQuery(this).attr('title', thisObj.get(i18nKey));
		});
	}
}







