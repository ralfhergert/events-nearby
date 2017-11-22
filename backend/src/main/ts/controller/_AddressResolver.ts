import {RequestController} from './RequestController';
import {Address} from '../model/Address';

/**
 * This controller resolves a given address string into a resolved address with GPS-coordinates.
 */
export class AddressResolver extends RequestController<Address,string> {

	constructor() {
		super('/api/address', 'Could not resolve address from server. Waiting for server to be reachable...');
	}

	protected getRequestQuery(info: string): string {
		return '?query=' + info;
	}
}
