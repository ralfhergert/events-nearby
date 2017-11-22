package org.nextup.backend.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

/**
 * This validation annotation can be attached to a {@link String}.
 * It will check whether the given string contains a resolvable address.
 * If the string is null or empty no complaint will be raise. Use also
 * {@link javax.validation.constraints.NotNull} or
 * {@link org.hibernate.validator.constraints.NotEmpty} or
 * {@link org.hibernate.validator.constraints.NotBlank} for these cases.
 */
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ResolvableAddressValidator.class)
@Documented
public @interface ResolvableAddress {

	String message() default "{org.nextup.backend.validation.NoResolvableAddress}";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
