export class UniqueId {
	static i = 0;

	static getNext(): number {
		return ++this.i;
	}
}
