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

## Production build
- Production build is done with the Google Closure Compiler that outputs bundles 30% smaller than esbuild.