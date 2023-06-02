export default interface IStarRating extends HTMLElement {
	/**
	 * Sets the current star rating, valid values are 0 - 5, both inclusive.
	 * Selectable values are on the other hand 1 - 5, both inclusive.
	 * Default value is NaN, which represents no value has been set.
	 */
	value: number;

	/**
	 * A boolean value that sets if the element is disabled or not.
	 * Default value is false.
	 */
	disabled: boolean;

	/**
	 * A boolean value that sets if the element is read only or not.
	 * Default value is false.
	 */
	readOnly: boolean;
}
