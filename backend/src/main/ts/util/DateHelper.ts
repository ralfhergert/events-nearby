export class DateHelper {
	static createOffsetDate(offsetSeconds): Date {
		let date = new Date();
		date.setTime(date.getTime() + offsetSeconds * 1000);
		return date;
	}
}
