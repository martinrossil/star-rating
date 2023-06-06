export default interface IStar extends HTMLElement {
	/**
	 * Sets the current star rating, valid values are 0 - 1, both inclusive.
	 * Default value is 0.
	 */
	value: number;
}
