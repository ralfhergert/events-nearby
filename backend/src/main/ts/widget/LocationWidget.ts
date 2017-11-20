/**
 * This widget helps links an address and GPS coordinates.
 */
export class LocationWidget {
	private $target: any; // should be a jQuery node.
	private name: string;

	public constructor($target: any, name: string) {
		this.$target = $target;
		this.name = name;
		jQuery('<input type="text">')
			.attr('name', name + '.address')
			.attr('maxlength', 160)
			.appendTo($target);
	}

	public getValues(): any {
		let location = {};
		let address = this.$target.find('[name="' + this.name + '.address"]').val() as string;
		if (address.length > 0) {
			location['address'] = address;
		}
		return location;
	}
}
