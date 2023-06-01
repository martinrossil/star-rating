import IStarRating from './IStarRating';

export default class StarRating extends HTMLElement implements IStarRating {
	public constructor() {
		super();
	}

	private _value = 0;

	public get value() {
		return this._value;
	}

	public set value(value: number) {
		this._value = value;
	}

	private _disabled = false;

	public get disabled() {
		return this._disabled;
	}

	public set disabled(value: boolean) {
		this._disabled = value;
	}

	private _size: 'small' | 'medium' | 'large' = 'medium';

	public get size() {
		return this._size;
	}

	public set size(value: 'small' | 'medium' | 'large') {
		this._size = value;
	}

	private _readOnly = false;

	public get readOnly() {
		return this._readOnly;
	}

	public set readOnly(value: boolean) {
		this._readOnly = value;
	}
}
customElements.define('star-rating', StarRating);
