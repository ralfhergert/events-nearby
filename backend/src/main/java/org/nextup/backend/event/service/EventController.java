package org.nextup.backend.event.service;

import org.nextup.backend.event.entity.EventEntity;
import org.nextup.backend.event.repository.EventRepository;
import org.nextup.backend.event.to.Event;
import org.nextup.backend.geocoder.service.AddressController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * This service creates a given event.
 */
@RestController
public class EventController {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private AddressController addressController;

	@RequestMapping(path = "api/event", method = RequestMethod.GET)
	public Event getEvent(@RequestParam(value="id") UUID id) {
		return eventRepository.findById(id)
			.map(Event::new)
			.orElse(null);
	}

	@RequestMapping(path = "api/event", method = RequestMethod.POST)
	public Event saveEvent(@Valid @RequestBody Event event, @RequestParam(value="validateOnly", required = false, defaultValue = "false") final boolean validationOnly) {
		final EventEntity entity = event.getId() != null
			? eventRepository.findById(event.getId()).orElse(new EventEntity())
			: new EventEntity();

		entity.setTitle(event.getTitle());
		entity.setDescription(event.getDescription());
		entity.setImageId(event.getImageId());
		entity.setAddress(event.getLocation());
		entity.setStartDate(event.getStartDate());
		entity.setDuration(event.getDuration());
		entity.setResolvedAddress(addressController.resolveAddressEntity(event.getLocation()));
		return new Event(validationOnly ? entity : eventRepository.save(entity));
	}

	@RequestMapping(path = "api/events", method = RequestMethod.GET)
	public List<Event> getEvents(@RequestParam(value="lon", required = false) Double longitude, @RequestParam(value = "lat", required = false) Double latitude) {
		final List<Event> events = new ArrayList<>();
		for (EventEntity event : eventRepository.findAll()) {
			events.add(new Event(event));
		}
		return events;
	}
}
