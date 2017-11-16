package org.nextup.backend.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * This validation annotation can be attached a map.
 * It will check that no null or empty values are in this map.
 */
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NoEmptyValuesValidator.class)
@Documented
public @interface NoEmptyValues {

	String message() default "{org.nextup.backend.validation.NoEmptyValues}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
