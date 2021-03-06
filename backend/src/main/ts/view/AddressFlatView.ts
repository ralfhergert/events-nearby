import {EntityListener} from '../controller/RequestController';
import {Address} from '../model/Address';
import {I18n} from '../i18n/I18n';
import {ValidationHelper} from '../util/ValidationHelper';

/**
 * This view renders the given address in a flat read-only view.
 */
export class AddressFlatView implements EntityListener<Address> {
	private $target: any; // should be a jQuery node.
	private i18n: I18n;

	constructor($target: any, i18n: I18n) {
		this.$target = $target;
		this.i18n = i18n;
		this.updateEntity(null);
	}

	public updateEntity(address: Address) {
		let thisObj = this;
		if (address == null) {
			ValidationHelper.markInvalidWithText(this.$target, this.i18n.get('addressFlatView_unknownAddress'));
		} else {
			// update the contents.
			ValidationHelper.markValid(this.$target.empty())
				.append(jQuery('<span class="address">').text(address.street))
				.append(' ')
				.append(jQuery('<span class="houseNumber">').text(address.houseNumber))
				.append(' ')
				.append(jQuery('<span class="postcode">').text(address.postcode))
				.append(' ')
				.append(jQuery('<span class="city">').text(address.city))
				.append(' ')
				.append(jQuery('<span class="state">').text(address.state))
				.append(' ')
				.append(jQuery('<span class="country">').text(address.country));
		}
	}
}
