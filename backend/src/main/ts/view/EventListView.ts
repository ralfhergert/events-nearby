import {LocalEvent} from '../model/LocalEvent';
import {EntityListener} from '../controller/RequestController';

export class EventListView implements EntityListener<Array<LocalEvent>> {
	private $target: any; // should be a jQuery node.

	constructor($target: any) {
		this.$target = $target;
	}

	/**
	 * This method takes the given list of events and update the internal list.
	 * Events which are no longer in the given list are removed from the view,
	 * while events which are new are added.
	 */
	public updateEntity(events: Array<LocalEvent>) {
		let existingLocalEventIds: Array<string> = events.map(e => e.id);
		// remove all events which are no longer in the given list.
		this.$target.children('.local-event-view').each(function() {
			if (existingLocalEventIds.indexOf(jQuery(this).attr('data-local-event-id')) < 0) {
				jQuery(this).slideUp(function() { jQuery(this).remove(); });
			}
		});
		// add new events is they do not exist in the rendered view yet.
		let $marker = jQuery('<div class="marker">').prependTo(this.$target);
		let $previousNode = $marker;
		for (let event of events) {
			let $node = this.$target.find('[data-local-event-id="' + event.id + '"]');
			if ($node.length > 0) { // event does exist.
				$previousNode = $node;
			} else { // event does not exist - render it
				let startDate = new Date(event.startDate);
				$previousNode = jQuery('<div class="local-event-view">')
					.attr('data-local-event-id', event.id)
					.append(jQuery('<div class="startDate">')
						.append(jQuery('<span class="day">').text(startDate.getDate()))
						.append(jQuery('<span class="monthAndYear">').text((startDate.getMonth() + 1) + '.' + startDate.getFullYear())))
					.append(jQuery('<div class="startTime">')
						.append(jQuery('<span class="time">').text((startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes())))
					.append(jQuery('<span class="title">').text(event.title['de']))
					.append(jQuery('<span class="description">').text(event.description['de']))
					.slideDown()
					.insertAfter($previousNode);
				if (event.imageId) {
					$previousNode.css({'background': 'url("/api/image/' + event.imageId + '") no-repeat center/cover'})
				}
			}
		}
		// finally remove the previously inserted marker.
		$marker.remove();
	}
}
