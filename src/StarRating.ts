export default class StarRating extends HTMLElement {
	public static get observedAttributes() {
		return ['disabled', 'value'];
	}

	public constructor() {
		super();
		this.style.background = 'red';
		this.style.display = 'inline-flex';
		this.style.minWidth = '250px';
		this.style.minHeight = '16px';
	}

	public attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {
		console.log('name [' + name + ']', 'old [' + oldValue + ']', 'new [' + newValue + ']');
		console.log(oldValue === null);
		console.log(newValue === '');
	}
}
customElements.define('star-rating', StarRating);
