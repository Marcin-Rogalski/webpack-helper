# Webpack Helper

Tired of looking back and forth to webpack documentation? I was too. Now You can have typings in your webpack.config.js file!

## Installation

Just install it as any other module:

```
npm install --save-dev @rogalski/webpack-helper
```

## Usage

Import webpack-helper in your webpack.config.js file:

```javascript
const { createConfig, mergeConfig } = require("webpack-helper")
```

Now use createConfig function:

```javascript
module.exports = createConfig({
	entry: "./scr/main.ts"
})
```

or

```javascript
module.exports = function (env, argv) {
	const common = createConfig({
		// ...
	})

	const main = createConfig({
		// ...
	})

	const interface = createConfig({
		// ...
	})

	return [mergeConfig(common, main), mergeConfig(common, interface)]
}
```

### _createConfig()_

Uses webpack type definitions to typecheck your code. Simply put your config inside id:

![It was a screenshot but it didn't load :(](https://raw.githubusercontent.com/Marcin-Rogalski/webpack-helper/master/screenshot.jpg)

### _mergeConfig()_

Merges two or more configurations. It takes configurations as arguments and merges them into one configuration object. Configurations gets overwritten in the order they are passed to the function.

-   It does not replace objects, it extends them based on the keys
-   It does not replaces arrays, it overwrites entries based on the index

Examples:

```javascript
// objects
mergeCOnfig({}, { test: "a" }) // {test: 'a'}
mergeCOnfig({ test: "a" }, { test: "b" }) // {test: 'b'}
mergeCOnfig({ testA: "a" }, { testB: "b" }) // {testA: 'a', testB: 'b'}
mergeCOnfig({ test: "a" }, { test: { b: 'b' }) // {test: {b: 'b'}}

// arrays
mergeCOnfig({ test: ["a"] }, { test: ["b"]) // {test: ["b"]}
mergeCOnfig({ test: [{a: 'a'}] }, { test: [{a: 'b'}] ) // {test: [{a: 'b'}]}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
