package org.nextup.backend.validation;

import org.nextup.backend.geocoder.service.AddressController;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Check that the given map has no null or empty values.
 */
public class ResolvableAddressValidator implements ConstraintValidator<ResolvableAddress, String> {

	@Autowired
	private AddressController addressController;

	@Override
	public void initialize(ResolvableAddress constraintAnnotation) {}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		// no validation on null or empty or blank strings.
		if (value == null || value.trim().isEmpty()) {
			return true;
		}
		return addressController.resolveAddress(value) != null;
	}
}
