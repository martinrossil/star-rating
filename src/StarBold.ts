import IColorable from './IColorable';
import IDisabledable from './IDisabledable';
import ISizeable from './ISizeable';
import IStar from './IStar';

export default class StarBold extends HTMLElement implements ISizeable, IStar, IColorable, IDisabledable {
	public constructor() {
		super();
		this.style.width = '24px';
		this.style.height = '24px';
		this.style.display = 'inline-block';
		this.appendChild(this.svg);
	}

	private sizeChanged() {
		// medium is default size that maps to 24 pixel.
		let px = 24;
		if (this.size === 'small') {
			px = 16;
		} else if (this.size === 'large') {
			px = 32;
		}

		this.style.width = px + 'px';
		this.style.height = px + 'px';
		this.svg.style.width = px + 'px';
		this.svg.style.height = px + 'px';
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

	private colorChanged() {
		if (!this.disabled) {
			this.valueRect.setAttribute('fill', this.color);
		}
	}

	private _color = '#000';

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
		if (this.disabled) {
			this.valueRect.setAttribute('fill', this.disabledColor);
		}
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

	private disabledChanged() {
		if (this.disabled) {
			this.valueRect.setAttribute('fill', this.disabledColor);
		} else {
			this.valueRect.setAttribute('fill', this.color);
		}
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

	private _path!: SVGPathElement;

	private get path() {
		if (!this._path) {
			this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			this._path.setAttribute('fill', '#FF0000');
			this._path.setAttribute('d', 'M4.08 22.3 6.2 15 .48 10.14a1.31 1.31 0 0 1 .82-2.32h7L10.77.86a1.28 1.28 0 0 1 2.42 0l2.51 7.01h7a1.32 1.32 0 0 1 .8 2.34l-5.9 4.84 2.3 7.19A1.27 1.27 0 0 1 18.78 24c-.28.01-.55-.06-.78-.21l-6-4.07-6 4.07a1.3 1.3 0 0 1-.76.2 1.3 1.3 0 0 1-1.17-1.68Z');
		}

		return this._path;
	}

	private _clipPath!: SVGClipPathElement;

	private get clipPath() {
		if (!this._clipPath) {
			this._clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
			this._clipPath.setAttribute('id', 'mask');
			this._clipPath.appendChild(this.path);
		}

		return this._clipPath;
	}

	private _backgroundRect!: SVGRectElement;

	private get backgroundRect() {
		if (!this._backgroundRect) {
			this._backgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			this._backgroundRect.setAttribute('width', '100%');
			this._backgroundRect.setAttribute('height', '100%');
			this._backgroundRect.setAttribute('fill', '#d5e1e5');
			this._backgroundRect.style.clipPath = 'url(#mask)';
		}

		return this._backgroundRect;
	}

	private _valueRect!: SVGRectElement;

	private get valueRect() {
		if (!this._valueRect) {
			this._valueRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			this._valueRect.setAttribute('height', '100%');
			this._valueRect.setAttribute('fill', '#eba600');
			this._valueRect.style.clipPath = 'url(#mask)';
		}

		return this._valueRect;
	}

	private _svg!: SVGSVGElement;

	private get svg() {
		if (!this._svg) {
			this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this._svg.style.position = 'absolute';
			this._svg.style.overflow = 'visible';
			this._svg.setAttribute('fill', 'none');
			this._svg.setAttribute('viewBox', '0 0 24 24');
			this._svg.setAttribute('width', '24px');
			this._svg.setAttribute('height', '24px');
			this._svg.appendChild(this.backgroundRect);
			this._svg.appendChild(this.valueRect);
			this._svg.appendChild(this.clipPath);
		}

		return this._svg;
	}

	private valueChanged() {
		// We can be certain that this.value is a value from 0 to 1,
		// so we can safely convert it to a percentage string respresentation.
		const percent = Math.floor(this.value * 100).toString() + '%';
		// And set the width attribute of the valueRect to this percent.
		this.valueRect.setAttribute('width', percent);
	}

	private _value = 0;

	public get value() {
		return this._value;
	}

	public set value(value: number) {
		if (this._value === value) {
			return;
		}

		if (isNaN(value) || value < 0 || value > 1) {
			this._value = 0;
			this.valueChanged();
			return;
		}

		this._value = value;
		this.valueChanged();
	}
}
customElements.define('star-bold', StarBold);
