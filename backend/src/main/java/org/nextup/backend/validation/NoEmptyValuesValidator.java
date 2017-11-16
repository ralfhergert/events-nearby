package org.nextup.backend.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Map;

/**
 * Check that the given map has no null or empty values.
 */
public class NoEmptyValuesValidator implements ConstraintValidator<NoEmptyValues, Map<?,String>> {

	@Override
	public void initialize(NoEmptyValues constraintAnnotation) {}

	@Override
	public boolean isValid(Map<?,String> map, ConstraintValidatorContext context) {
		boolean isValid = true;
		for (Map.Entry<?,String> entry : map.entrySet()) {
			if (entry.getValue() == null || entry.getValue().isEmpty()) {
				context.buildConstraintViolationWithTemplate("empty value")
					.addBeanNode()
					.inIterable().atKey(entry.getKey())
					.addConstraintViolation();
				isValid = false;
			}
		}
		return isValid;
	}
}
