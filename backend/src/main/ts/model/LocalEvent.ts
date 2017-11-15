export class LocalEvent {
	private _id: string;
	private _title: any; // use Map<string,string> after switching to ES6;
	private _description: any; // use Map<string,string> after switching to ES6;
	private _image: URL;
	private _location: Location;
	private _startDate: Date;
	private _endDate: Date;

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get title(): any {
		return this._title;
	}

	set title(value: any) {
		this._title = value;
	}

	get description(): any {
		return this._description;
	}

	set description(value: any) {
		this._description = value;
	}

	get image(): URL {
		return this._image;
	}

	set image(value: URL) {
		this._image = value;
	}

	get location(): Location {
		return this._location;
	}

	set location(value: Location) {
		this._location = value;
	}

	get startDate(): Date {
		return this._startDate;
	}

	set startDate(value: Date) {
		this._startDate = value;
	}

	get endDate(): Date {
		return this._endDate;
	}

	set endDate(value: Date) {
		this._endDate = value;
	}
}
