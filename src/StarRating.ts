import IColorable from './IColorable';
import ISizeable from './ISizeable';
import IStarRating from './IStarRating';
import StarBold from './StarBold';

export default class StarRating extends HTMLElement implements IStarRating, ISizeable, IColorable {
	public static get observedAttributes() {
		return ['value', 'disabled', 'size', 'readonly', 'color', 'disabled-color', 'background-color'];
	}

	public constructor() {
		super();
		this.style.display = 'inline-flex';
		this.style.gap = '8px';
		this.style.outlineOffset = '8px';
		this.style.borderRadius = '20px';
		this.tabIndex = 0;
		this.addEventListener('focus', this.focused);
		this.addEventListener('blur', this.blurred);
		this.appendChild(new StarBold());
		this.appendChild(new StarBold());
		this.appendChild(new StarBold());
		this.appendChild(new StarBold());
		this.appendChild(new StarBold());
	}

	private focused() {
		if (this.disabled) {
			this.style.outline = 'solid 2px ' + this.disabledColor;
		} else {
			this.style.outline = 'solid 2px ' + this.color;
		}
	}

	private blurred() {
		this.style.outline = 'none';
	}

	private resetAllChildStarValues() {
		this.childNodes.forEach(star => {
			if (star instanceof StarBold) {
				star.value = 0;
			}
		});
	}

	private setStarValues() {
		const integer = Math.floor(this.value);
		let decimal = parseFloat((this.value - integer).toFixed(1));
		this.childNodes.forEach((star, index) => {
			if (star instanceof StarBold) {
				if ((index + 1) <= this.value) {
					star.value = 1;
				} else {
					star.value = decimal;
					decimal = 0;
				}
			}
		});
	}

	private updateChildStarsValues() {
		if (isNaN(this.value)) {
			this.resetAllChildStarValues();
		} else {
			this.setStarValues();
		}
	}

	private updateValueAttribute() {
		if (isNaN(this.value)) {
			this.removeAttribute('value');
		} else {
			this.setAttribute('value', this.value.toString());
		}
	}

	private updateAriaLabelProperty() {
		const valueWithComma = this.value.toString().replace('.', ',');
		let label = 'Stjerne Rating ' + valueWithComma + ' ud af 5';
		if (this.disabled) {
			label += ' deaktiveret';
		}

		this.ariaLabel = label;
	}

	private valueChanged() {
		this.updateValueAttribute();
		this.updateChildStarsValues();
		this.updateAriaLabelProperty();
	}

	private _value = NaN;

	public get value() {
		return this._value;
	}

	public set value(value: number) {
		if (this._value === value) {
			return;
		}

		// NaN is one of those funny js things where NaN !== NaN,
		// so we guard for this aswell.
		if (isNaN(this._value) && isNaN(value)) {
			return;
		}

		// If value is out of range, we reset to NaN.
		if (value < 0 || value > 5) {
			this._value = NaN;
			this.valueChanged();
			return;
		}

		this._value = value;
		this.valueChanged();
	}

	private disabledChanged() {
		if (this.disabled) {
			this.setAttribute('disabled', '');
		} else {
			this.removeAttribute('disabled');
		}

		this.updateChildrenDisabled();
	}

	private updateChildrenDisabled() {
		this.childNodes.forEach(child => {
			if (child instanceof StarBold) {
				child.disabled = this.disabled;
			}
		});
	}

	private _disabled = false;

	public get disabled() {
		return this._disabled;
	}

	public set disabled(value: boolean) {
		if (this._disabled === value) {
			return;
		}

		this._disabled = value;
		this.disabledChanged();
	}

	private sizeChanged() {
		this.updateGapBetweenStars();
		this.updateChildrenSize();
		this.updateSizeAttribute();
		this.updateOutlineOffset();
		this.updateBorderRadius();
	}

	private updateGapBetweenStars() {
		let gap = 8;
		if (this.size === 'small') {
			gap = 4;
		} else if (this.size === 'large') {
			gap = 12;
		}

		this.style.gap = gap + 'px';
	}

	private updateChildrenSize() {
		this.childNodes.forEach(child => {
			// we check if the child is indeed a StarBold instance, some other tag
			// could be added somehow, allways be safe than sorry.
			if (child instanceof StarBold) {
				child.size = this.size;
			}
		});
	}

	private updateSizeAttribute() {
		// medium size is default, so only set the size attribute for small and large.
		if (this.size === 'small' || this.size === 'large') {
			this.setAttribute('size', this.size);
		} else {
			this.removeAttribute('size');
		}
	}

	private updateOutlineOffset() {
		let offset = 8;
		if (this.size === 'small') {
			offset = 4;
		} else if (this.size === 'large') {
			offset = 12;
		}

		this.style.outlineOffset = offset + 'px';
	}

	private updateBorderRadius() {
		let radius = 20;
		if (this.size === 'small') {
			radius = 12;
		} else if (this.size === 'large') {
			radius = 28;
		}

		this.style.borderRadius = radius + 'px';
	}

	private updateChildrenColor() {
		this.childNodes.forEach(child => {
			if (child instanceof StarBold) {
				child.color = this.color;
			}
		});
	}

	private updateChildrenDisabledColor() {
		this.childNodes.forEach(child => {
			if (child instanceof StarBold) {
				child.disabledColor = this.disabledColor;
			}
		});
	}

	private updateChildrenBackgroundColor() {
		this.childNodes.forEach(child => {
			if (child instanceof StarBold) {
				child.backgroundColor = this.backgroundColor;
			}
		});
	}

	private _size: 'small' | 'medium' | 'large' = 'medium';

	public get size() {
		return this._size;
	}

	public set size(value: 'small' | 'medium' | 'large') {
		if (this._size === value) {
			return;
		}

		// We have guarded this setter with types but we could be called from javascript,
		// so guard for correct values here aswell.
		if (value === 'small' || value === 'medium' || value === 'large') {
			this._size = value;
			this.sizeChanged();
		}
	}

	private readOnlyChanged() {
		if (this.readOnly) {
			this.setAttribute('readonly', '');
		} else {
			this.removeAttribute('readonly');
		}
	}

	private _readOnly = false;

	public get readOnly() {
		return this._readOnly;
	}

	public set readOnly(value: boolean) {
		if (this._readOnly === value) {
			return;
		}

		this._readOnly = value;
		this.readOnlyChanged();
	}

	private colorChanged() {
		this.updateChildrenColor();
	}

	private _color = '#eba600';

	public get color() {
		return this._color;
	}

	public set color(value: string) {
		if (this._color === value) {
			return;
		}

		this._color = value;
		this.colorChanged();
	}

	private disabledColorChanged() {
		this.updateChildrenDisabledColor();
	}

	private _disabledColor = '';

	public get disabledColor() {
		return this._disabledColor;
	}

	public set disabledColor(value: string) {
		if (this._disabledColor === value) {
			return;
		}

		this._disabledColor = value;
		this.disabledColorChanged();
	}

	private backgroundColorChanged() {
		this.updateChildrenBackgroundColor();
	}

	private _backgroundColor = '';

	public get backgroundColor() {
		return this._backgroundColor;
	}

	public set backgroundColor(value: string) {
		if (this._backgroundColor === value) {
			return;
		}

		this._backgroundColor = value;
		this.backgroundColorChanged();
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

	private colorAttributeChanged(value: string) {
		this.color = value;
	}

	private disabledColorAttributeChanged(value: string) {
		this.disabledColor = value;
	}

	private backgroundColorAttributeChanged(value: string) {
		this.backgroundColor = value;
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
			case 'color': this.colorAttributeChanged(newValue);
				break;
			case 'disabled-color': this.disabledColorAttributeChanged(newValue);
				break;
			case 'background-color': this.backgroundColorAttributeChanged(newValue);
				break;
			default: break;
		}
	}
}
customElements.define('star-rating', StarRating);
