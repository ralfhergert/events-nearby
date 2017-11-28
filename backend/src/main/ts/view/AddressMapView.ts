import {EntityListener} from '../controller/RequestController';
import {Address} from '../model/Address';

/**
 * This view renders the given address on a map.
 */
export class AddressMapView implements EntityListener<Address> {
	private $target: any; // should be a jQuery node.
	private map: any;

	constructor($target: any) {
		this.$target = $target;
		this.map = new ol.Map({
			target: $target.attr('id'),
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
			],
			controls: ol.control.defaults({
				attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
					collapsible: false
				})
			}),
			view: new ol.View({
				center: ol.proj.fromLonLat([0, 0]),
				zoom: 1
			})
		});
		// modify all links Map created to use a blank target.
		this.map.once('postrender', function() {
			this.find('a')
				.attr('target', '_blank')
				.attr('tabIndex', '-1'); // remove these link from the tab order
			this.find('button').attr('tabIndex', '-1'); // remove these buttons from the tab order
		}, this.$target);
	}

	public updateEntity(address: Address) {
		if (address != null && address.lon != null && address.lat != null) {
			this.flyTo(address.lon, address.lat, 17);
		}
	}

	public flyTo(lon: number, lat: number, targetZoom: number) {
		let duration = 2000;
		let currentPosition = ol.proj.toLonLat(this.map.getView().getCenter());
		let distance = Math.sqrt(Math.pow(lon - currentPosition[0], 2) + Math.pow(lat - currentPosition[1], 2));
		if (distance < 0.0001) { // ~11m
			return;
		}
		let retractZoom = Math.log(180/distance)/Math.log(1.77);
		if (retractZoom > 18) {
			retractZoom = 18;
		}
		if (retractZoom < 1) {
			retractZoom = 1;
		}
		// animation of the translational change
		this.map.getView().animate({
			center: ol.proj.fromLonLat([lon, lat]),
			duration: duration
		});
		// animation of the zoom.
		var zoom = this.map.getView().getZoom();
		this.map.getView().animate({
			zoom: retractZoom,
			duration: duration / 2
		}, {
			zoom: targetZoom,
			duration: duration / 2
		});
	}
}
