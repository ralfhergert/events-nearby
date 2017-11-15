export class LocalEvent {
	private _id: string;
	private _title: any; // use Map<string,string> after switching to ES6;
	private _description: any; // use Map<string,string> after switching to ES6;
	private image: URL;
	private location: Location;
	private startTime: Date;
	private endTime: Date;

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
		this._title=value;
	}


	get description(): any {
		return this._description;
	}

	set description(value: any) {
		this._description = value;
	}
}
