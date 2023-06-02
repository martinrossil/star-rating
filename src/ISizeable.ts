export default interface ISizeable extends HTMLElement {
	/**
	 * The star size, valid values are 'small', 'medium' and 'large'.
	 * small = 16px, medium = 24px and large = 32px.
	 * Default value is 'medium'.
	 */
	size: 'small' | 'medium' | 'large';
}
