export class ValidationHelper {

	/**
	 * This method will mark the given target as invalid.
	 * @return the given target-node
	 */
	static markInvalid($target: any): any {
		return $target.removeClass('validation-ok').addClass('validation-error');
	}

	/**
	 * This method will mark the given target as valid.
	 * @return the given target-node
	 */
	static markValid($target: any): any {
		return $target.removeClass('validation-error').addClass('validation-ok');
	}

	/**
	 * This method will mark the given target as invalid.
	 * @return the given target-node
	 */
	static markInvalidWithText($target: any, text: String): any {
		return ValidationHelper.markInvalid($target).text(text);
	}
}
