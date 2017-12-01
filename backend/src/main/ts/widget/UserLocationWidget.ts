import {EntityListener} from '../controller/RequestController';
import {Address} from '../model/Address';
import {UniversalScheduler} from '../controller/UniversalScheduler';
import {AddressResolver} from '../controller/_AddressResolver';
import {I18n} from '../i18n/I18n';
import {GPSLocation} from '../model/GPSLocation';

export class UserLocationWidget {
	readonly $input: any;
	readonly addressResolver: AddressResolver;
	protected gpsLocationListener: Array<EntityListener<GPSLocation>> = [];
	private location: GPSLocation;

	constructor($input: any, i18n: I18n) {
		let thisObj = this;
		this.$input = $input;
		let scheduler = new UniversalScheduler(function() { thisObj.checkForNewLocation(); });
		// register a change listener on the form.
		$input.change(function() {
			scheduler.schedule();
		}).keypress(function(event: any) {
			// ignore any control keys (cursor, tab, pos1, end, enter), but respect backspace and delete
			if (event.charCode != 0 || event.key === 'Delete' || event.key === 'Backspace') {
				scheduler.schedule(1000); // 1 second
			}
		});
		this.addressResolver = new AddressResolver(i18n);
		this.addressResolver.addLocalEventListener({
			updateEntity: function(address: Address) {
				if (address == null) {
					thisObj.$input.removeClass('validation-ok').addClass('validation-error');
					thisObj.updateGPSLocation(null);
				} else {
					thisObj.$input.removeClass('validation-error').addClass('validation-ok');
					thisObj.updateGPSLocation(new GPSLocation(address.lat, address.lon));
				}
			}
		});
	}

	public addGPSLocationListener(listener: EntityListener<GPSLocation>): void {
		this.gpsLocationListener.push(listener);
	}

	public checkForNewLocation(): void {
		let value = this.$input.val();
		if (value.indexOf('@') == 0) {
			let coordinates = value.substring(1).split(',');
			if (coordinates.length > 1) {
				this.updateGPSLocation(new GPSLocation(Number(coordinates[0]), Number(coordinates[1])));
			}
		} else {
			this.addressResolver.request(value);
		}
	}

	protected updateGPSLocation(location: GPSLocation): void {
		let oldLocation = this.location;
		this.location = location;
		// inform all listeners when the location did change.
		if (this.location == null && oldLocation != null || (this.location != null && !this.location.equals(oldLocation))) {
			this.gpsLocationListener.forEach(listener => { listener.updateEntity(this.location); });
		}
	}

	public setGPSLocation(location: GPSLocation) {
		if (location == null) {
			this.$input.val('').change();
		} else {
			this.$input.val('@' + location.lat + ',' + location.lon).change();
		}
	}

	public getGPSLocation(): GPSLocation {
		return this.location;
	}
}
