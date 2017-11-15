/**
 * This widget carries multiple {@link LocalizableTextWidget}.
 */
export class LocalizableTextListWidget {
	private $target: any; // should be a jQuery node.
	private type: LocalizableFieldType;
	private name: string;
	private $list: any;
	private index = 0;

	constructor($target: any, type: LocalizableFieldType, name: string) {
		let thisObj = this;
		this.$target = $target;
		this.type = type;
		this.name = name;
		this.$list = jQuery('<div class="localizable-text-list">').appendTo($target);
		// create an add-button
		jQuery('<input type="button" value="Add">')
			.appendTo($target)
			.click(function() {
				thisObj.createFurtherTextWidget();
			});
		// create the very first field.
		this.createFurtherTextWidget();
	}

	public createFurtherTextWidget(): void {
		this.$list.append(LocalizableTextWidget.create(this.type, this.name + '.' + this.index++).$target);
	}

	public getValues(): any {
		let values = {};
		this.$list.children().each(function() {
			let locale = jQuery(this).children('.locale').val() as string;
			let text = jQuery(this).children('.text').val() as string;
			if (locale.length > 0 && text.length > 0) {
				values[locale] = text;
			}
		});
		return values;
	}
}

/**
 * This widget creates two inputs: the first carry the local the other the corresponding text.
 */
export class LocalizableTextWidget {
	readonly $target: any; // should be a jQuery node.
	private name: string;

	private constructor($target: any, name: string) {
		this.$target = $target;
		this.name = name;
	}

	public static create(type: LocalizableFieldType, name: string): LocalizableTextWidget {
		let $node = jQuery('<div class="localizable-text">')
			.append(jQuery('<input type="text" class="locale"/>').attr('name', name + '.locale'));
		if (type === LocalizableFieldType.Input) {
			$node.append(jQuery('<input type="text" class="text"/>').attr('name', name + '.text'));
		} else {
			$node.append(jQuery('<textarea class="text"/>').attr('name', name + '.text'));
		}
		// create a delete button.
		jQuery('<input type="button" value="Remove">')
			.appendTo($node)
			.click(function() {
				$node.remove();
			});
		return new LocalizableTextWidget($node, name);
	}
}

export enum LocalizableFieldType {
	Input,
	Textarea
}
