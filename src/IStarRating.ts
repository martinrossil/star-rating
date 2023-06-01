export default interface IStarRating extends HTMLElement {
	/**
	 * Sets the current star rating, valid values are 0 - 5, both inclusive.
	 * Default value is 0.
	 */
	value: number;

	/**
	 * A boolean value that sets if the element is disabled or not.
	 * Default value is false.
	 */
	disabled: boolean;

	/**
	 * The star size, valid values are 'small', 'medium' and 'large'.
	 * small = 16px, medium = 24px and large = 32px.
	 * Default value is 'medium'.
	 */
	size: 'small' | 'medium' | 'large';

	/**
	 * A boolean value that sets if the element is read only or not.
	 * Default value is false.
	 */
	readOnly: boolean;
}
