import {LanguageSelectorWidget} from "./LanguageSelectorWidget";
import {WidgetDestroyedListener} from "../view/WidgetDestroyedListener";
import {I18n} from '../i18n/I18n';
/**
 * This widget carries multiple {@link LocalizableTextWidget}.
 */
export class LocalizableTextListWidget {
	private $target: any; // should be a jQuery node.
	private type: LocalizableFieldType;
	private name: string;
	private $list: any;
	private textWidgets: Array<LocalizableTextWidget> = [];
	private i18n: I18n;

	constructor($target: any, type: LocalizableFieldType, name: string, i18n: I18n) {
		let thisObj = this;
		this.$target = $target;
		this.type = type;
		this.name = name;
		this.i18n = i18n;
		this.$list = jQuery('<div class="localizable-text-list">').appendTo($target);
		// create an add-button
		jQuery('<input type="button" value="Add">')
			.attr('data-i18n-value', 'createEventForm_' + name + '_add_label')
			.appendTo($target)
			.click(function() {
				thisObj.createFurtherTextWidget();
			});
		// create the very first field.
		i18n.apply($target);
		this.createFurtherTextWidget();
	}

	public createFurtherTextWidget(): void {
		let thisObj = this;
		let widget = new LocalizableTextWidget(this.type, this.name, this.allSelectedLanguages(), this.textWidgets.length == 0 ? this.$target.attr('data-input-id') : null, this.i18n);
		this.textWidgets.push(widget);
		widget.$target.hide().appendTo(this.$list).slideDown();
		// register a change listener for language changes.
		widget.addLanguageSelectionChangedListener({
			changed() {
				thisObj.updateSelectableLanguages();
			}
		});
		// register a widget destroyed listener to remove it from the list again.
		widget.addWidgetDestroyListener({
			destroyed(widget: LocalizableTextWidget) {
				thisObj.textWidgets.splice(thisObj.textWidgets.indexOf(widget), 1);
				thisObj.updateSelectableLanguages();
				thisObj.$target.change();
				// if the widget with the input carrying the id had been destroyed then let the first existing widget set the id.
				let inputId = thisObj.$target.attr('data-input-id');
				if (inputId != null && inputId.length > 0 && thisObj.$target.find('#' + inputId).length == 0 && thisObj.textWidgets.length > 0) {
					thisObj.textWidgets[0].setInputId(inputId);
				}
			}
		});
		thisObj.updateSelectableLanguages();
		// trigger a change event, to inform that a validation must be done.
		thisObj.$target.change();
	}

	protected updateSelectableLanguages(): void {
		let selectedLanguages = this.allSelectedLanguages();
		this.textWidgets.forEach(widget => { widget.updateDisabledLanguages(selectedLanguages) });
	}

	public getValues(): any {
		let values = {};
		this.textWidgets.forEach(widget =>  {
			let locale = widget.locale();
			let text = widget.text();
			if (locale.length > 0) {
				values[locale] = text;
			}
		});
		return values;
	}

	protected allSelectedLanguages(): Array<string> {
		let selectedLanguages: Array<string> = [];
		this.textWidgets.forEach(widget =>  {
			selectedLanguages.push(widget.locale());
		});
		return selectedLanguages;
	}
}

/**
 * This widget creates two inputs: the first carry the local the other the corresponding text.
 */
export class LocalizableTextWidget {
	readonly $target: any; // should be a jQuery node.
	readonly name: string;
	readonly languageSelector: LanguageSelectorWidget;
	readonly $input: any;
	private languageSelectionChangedListener: Array<LanguageSelectionChangedListener> = [];
	private destroyListeners: Array<WidgetDestroyedListener<LocalizableTextWidget>> = [];

	constructor(type: LocalizableFieldType, name: string, disabledLanguages: Array<string>, inputId: string, i18n: I18n) {
		let thisObj = this;
		this.name = name;
		this.$target = jQuery('<div class="localizable-text">');
		// create a language selector
		this.languageSelector = new LanguageSelectorWidget(disabledLanguages, navigator.language);
		this.languageSelector.$target.addClass('locale').appendTo(this.$target);
		this.languageSelector.$target.change(function() {
			let locale = jQuery(this).val() as string;
			thisObj.languageSelectionChangedListener.forEach(listener => { listener.changed(locale); });
			// alter the name of the text-field correspondingly.
			thisObj.$target.children('.text').attr('name', name + '[' + locale + ']');
			thisObj.$target.children('.validation-message').attr('data-name', name + '[' + locale + ']');
		});
		// create an input or textarea
		this.$input = (type === LocalizableFieldType.Input)
			? jQuery('<input type="text" class="text"/>')
			: jQuery('<textarea class="text"/>');
		this.$input.attr('name', name + '[' + this.locale() + ']').appendTo(this.$target);
		this.setInputId(inputId);
		// create a delete button.
		jQuery('<input type="button" value="Remove">')
			.attr('data-i18n-value', 'createEventForm_' + name + '_remove_label')
			.appendTo(this.$target)
			.click(function() {
				thisObj.$target.slideUp(function() {
					this.remove();
					// inform all destroy listeners that they can remove links to this widget instance.
					thisObj.destroyListeners.forEach(listener => { listener.destroyed(thisObj); });
				});
			});
		i18n.apply(this.$target);
		// prepare a span for the propable validation errors.
		jQuery('<span class="validation-message">').attr('data-name', name + '[' + this.locale() + ']').hide().appendTo(this.$target);
		jQuery('<div class="clear">').appendTo(this.$target);
	}

	public addLanguageSelectionChangedListener(listener: LanguageSelectionChangedListener): void {
		this.languageSelectionChangedListener.push(listener);
	}

	public addWidgetDestroyListener(listener: WidgetDestroyedListener<LocalizableTextWidget>): void {
		this.destroyListeners.push(listener);
	}

	public locale(): string {
		return this.languageSelector.value();
	}

	public text(): string {
		return this.$target.children('.text').val();
	}

	public updateDisabledLanguages(disabledLanguages: Array<string>) {
		this.languageSelector.updateDisabledLanguages(disabledLanguages);
	}

	public setInputId(inputId: string) {
		if (inputId != null && inputId.length > 0) {
			this.$input.attr('id', inputId);
		}
	}
}

export enum LocalizableFieldType {
	Input,
	Textarea
}

interface LanguageSelectionChangedListener {
	changed(language: string): void;
}
