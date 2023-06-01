# star-rating
A Star Rating component, implemented as a custom element written in Typescript.

## This repo describes the process required to develop a Star Rating custom element in Typescript
In this case, I'm not going to use the boilerplate setup, since it has "lit" as a runtime dependency.

## Specification
Imagine you're a contributor to a component library and you're being tasked with creating a new component.
The new component you're going to be creating is a star rating component and below is the designs you've gotten from your designer.

The component must be accessible and work in the majority of browser; Edge, Chrome, Firefox and Safari Mobile/Safari Desktop.

## Local setup
- Linting is required, so code reviews can be done faster and without the "You missed a semi colon here!".
- Local server setup with hot module reload is enabled with rollup and esbuild for fast feedback.

## Installation
The following dev dependencies are installed.

- Code is of course written in Typescript.
	- typescript

- Linting is eslint with XO ruleset which is very harsh but powerful.
	- @typescript-eslint/eslint-plugin
    - @typescript-eslint/parser
    - eslint"
    - eslint-config-xo
    - eslint-config-xo-typescript

- Local server
	- Rollup with server / HMR.
		- @rollup/plugin-html
		- @rollup/plugin-node-resolve
		- @rollup/plugin-strip
		- rollup
		- rollup-plugin-clear
		- rollup-plugin-copy
		- rollup-plugin-esbuild
		- rollup-plugin-filesize
		- rollup-plugin-livereload
		- rollup-plugin-serve
		- rollup-plugin-typescript2

So to get started, you clone the repo:
```shell
git clone https://github.com/martinrossil/star-rating.git
```

Install dependencies:
```shell
npm install
```

Start local development server with Hot Module Reload:
```shell
npm run dev
```

## Implementation
When we start developing a class based custom element, written in Typescript,
we first identify the public interface and sub elements.

In this case, what properties / attributes the outside world can set.

There are two ways a custom element can be instantiated.

```ts
const starRating = new StarRating();
document.body.appendChild(starRating);
```
or as a html tag
```html
<star-rating></star-rating>
```

So we start by defining the interface that the StarRating element implements in IStarRating.ts.
```ts
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
	 * Default value is 'medium'
	 */
	size: 'small' | 'medium' | 'large';

	/**
	 * A boolean value that sets if the element is read only or not.
	 * Default value is false
	 */
	readOnly: boolean;
}
```

And implement this interface in the StarRating element.
```ts
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
```

We now have to syncronize the properties and attributes, so when one changes, the
other updates aswell.

We add the static class member observedAttributes() above the cosntructor,
to watch for attributes changes.
The methos should return an Array of strings, representing the attribute names.
Be careful, no uppercase characters!

```ts
public static get observedAttributes() {
	return ['value', 'disabled', 'size', 'readonly'];
}
```

And add the attributeChangedCallback() methos at the bottom of the class.

```ts
public attributeChangedCallback(name: string, oldValue: string | null, newValue: string) {

}
```

We implement attribute changes that sets the property.

```ts
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
```

We now have to implement setter runtime guards and property -> attribute syncronization.



## Production build
- Production build is done with the Google Closure Compiler that outputs bundles 30% smaller than esbuild.