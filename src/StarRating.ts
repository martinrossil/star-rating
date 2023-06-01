import IStarRating from './IStarRating';

export default class StarRating extends HTMLElement implements IStarRating {
	public static get observedAttributes() {
		return ['value', 'disabled', 'size', 'readonly'];
	}

	public constructor() {
		super();
	}

	private _value = 0;

	public get value() {
		return this._value;
	}

	public set value(value: number) {
		console.log('value changed', value);
		this._value = value;
	}

	private _disabled = false;

	public get disabled() {
		return this._disabled;
	}

	public set disabled(value: boolean) {
		console.log('disabled changed', value);
		this._disabled = value;
	}

	private _size: 'small' | 'medium' | 'large' = 'medium';

	public get size() {
		return this._size;
	}

	public set size(value: 'small' | 'medium' | 'large') {
		console.log('size changed', value);
		this._size = value;
	}

	private _readOnly = false;

	public get readOnly() {
		return this._readOnly;
	}

	public set readOnly(value: boolean) {
		console.log('readOnly changed', value);
		this._readOnly = value;
	}

	private valueAttributeChanged(value: string) {
		this.value = parseFloat(value);
	}

	private disabledAttributeChanged(value: string) {
		this.disabled = value === '';
	}

	private sizeAttributeChanged(value: string) {
		if (value === 'small' || value === 'medium' || value === 'large') {
			this.size = value;
		}
	}

	private readonlyAttributeChanged(value: string) {
		this.readOnly = value === '';
	}

	public attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {
		switch (name) {
			case 'value': this.valueAttributeChanged(newValue);
				break;
			case 'disabled': this.disabledAttributeChanged(newValue);
				break;
			case 'size': this.sizeAttributeChanged(newValue);
				break;
			case 'readonly': this.readonlyAttributeChanged(newValue);
				break;
			default: {
				break;
			}
		}
	}
}
customElements.define('star-rating', StarRating);
