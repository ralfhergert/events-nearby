import {EntityListener} from '../controller/RequestController';
import {Address} from '../model/Address';

/**
 * This view renders the given address in a flat read-only view.
 */
export class AddressFlatView implements EntityListener<Address> {
	private $target: any; // should be a jQuery node.

	constructor($target: any) {
		this.$target = $target;
	}

	public updateEntity(address: Address) {
		let thisObj = this;
		if (address == null) {
			if (this.$target.is(':visible')) {
				this.$target.slideUp(function () {
					thisObj.$target.hide();
				});
			}
		} else {
			// update the contents.
			this.$target.empty()
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
			if (!this.$target.is(':visible')) {
				this.$target.slideDown();
			}
		}
	}
}
