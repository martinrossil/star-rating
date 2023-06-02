import ISizeable from './ISizeable';

export default class StarBold extends HTMLElement implements ISizeable {
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

	private _path!: SVGPathElement;

	private get path(): SVGPathElement {
		if (!this._path) {
			this._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			this._path.setAttribute('fill', '#eba600');
			this._path.setAttribute('d', 'M4.08 22.3 6.2 15 .48 10.14a1.31 1.31 0 0 1 .82-2.32h7L10.77.86a1.28 1.28 0 0 1 2.42 0l2.51 7.01h7a1.32 1.32 0 0 1 .8 2.34l-5.9 4.84 2.3 7.19A1.27 1.27 0 0 1 18.78 24c-.28.01-.55-.06-.78-.21l-6-4.07-6 4.07a1.3 1.3 0 0 1-.76.2 1.3 1.3 0 0 1-1.17-1.68Z');
		}

		return this._path;
	}

	private _svg!: SVGSVGElement;

	private get svg(): SVGSVGElement {
		if (!this._svg) {
			this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			this._svg.style.position = 'absolute';
			this._svg.style.overflow = 'visible';
			this._svg.setAttribute('fill', 'none');
			this._svg.setAttribute('viewBox', '0 0 24 24');
			this._svg.setAttribute('width', '24px');
			this._svg.setAttribute('height', '24px');
			this._svg.setAttribute('preserveAspectRatio', 'none');
			this._svg.appendChild(this.path);
		}

		return this._svg;
	}
}
customElements.define('star-bold', StarBold);
