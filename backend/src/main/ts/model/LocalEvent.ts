export class LocalEvent {
	id: string;
	title: any; // use Map<string,string> after switching to ES6;
	description: any; // use Map<string,string> after switching to ES6;
	image: URL;
	location: Location;
	startDate: Date;
	duration: String;
}
