import {RequestController} from './RequestController';
import {Address} from '../model/Address';
import {I18n} from '../i18n/I18n';

/**
 * This controller resolves a given address string into a resolved address with GPS-coordinates.
 */
export class AddressResolver extends RequestController<Address,string> {

	constructor(i18n: I18n) {
		super('/api/address', i18n);
	}

	protected getRequestQuery(info: string): string {
		return '?query=' + info;
	}
}
