package org.nextup.backend.service.event;

import org.nextup.backend.entity.EventEntity;
import org.nextup.backend.repository.EventRepository;
import org.nextup.backend.to.Event;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * This service creates a given event.
 */
@RestController
public class EventController {

	private EventRepository eventRepository;

	public EventController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	@RequestMapping(path = "api/event", method = RequestMethod.GET)
	public Event getEvent(@RequestParam(value="id") UUID id) {
		return new Event(eventRepository.findOne(id));
	}

	@RequestMapping(path = "api/event", method = RequestMethod.POST)
	public Event saveEvent(Event event) {
		EventEntity entity = event.getId() != null ? eventRepository.findOne(event.getId()) : null;
		if (entity == null) {
			entity = new EventEntity();
		}
		entity.setTitle(event.getTitle());
		entity.setDescription(event.getDescription());
		entity.setImage(event.getImage());
		entity.setAddress(event.getLocation() != null ? event.getLocation().getAddress() : null);
		entity.setStartTime(event.getStartTime());
		entity.setEndTime(event.getEndTime());
		return new Event(eventRepository.save(entity));
	}
}
