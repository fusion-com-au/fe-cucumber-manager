# fe-cucumber-manager

<img src="https://travis-ci.org/fusion-com-au/fe-cucumber-manager.svg?branch=master">

# Api

## Manager

Main class

**Examples**

```javascript
var CucumberManager = require('fe-cucumber-manager');

// test/e2e/steps/steps.js
module.exports = function () {
	CucumberManager
		.api(this)
		.constants([
			require('fe-nightwatch-cucumber/constants'),
			require('./constants'),
		])
		.selectors([
			require('fe-nightwatch-cucumber/selectors/forms'),
			require('./selectors/forms.custom'),
			...
		])
		.phrases([
			require('fe-nightwatch-cucumber/phrases/forms'),
			require('./phrases/forms.custom'),
			...
		]);
}
```

Returns **[Manager](#manager)** 

### api

Sets the nightwatch api

**Parameters**

-   `thing` **Nightwatch** the nightwatch client api object.

Returns **[Manager](#manager)** 

### selectors

Load up selector generators

**Parameters**

-   `sources` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** objects containing selector factories

Returns **[Manager](#manager)** 

### constants

Load up sources of constants.

**Parameters**

-   `sources` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** objects containing constants.

Returns **[Manager](#manager)** 

### store

Set some initial values in the Global value store.

**Parameters**

-   `key` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** valid key for npm:object-path
-   `value` **Any** 

**Examples**

```javascript
var CucumberManager = require('fe-cucumber-manager');

// test/e2e/steps/steps.js
module.exports = function () {
	CucumberManager
	  .store('foo', {
	  	some: {
	  		thing: {
	  			deep: {
	  				and: "meaningful"
	  			}
	  		}
	  	}
	  });
	}
```

Returns **[Manager](#manager)** 

### phrases

Instantiate phrases

**Parameters**

-   `sources` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** List of factories that generate valid Cucumber.js steps.

Returns **[Manager](#manager)** 

### prepareStringForXpathUsage

Formats a string for usage inside an Xpath query.

**Parameters**

-   `str` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### formatSelector

Sugar for [...].join('')

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## reduceMerge

Simple object merge function, overwrites existing properties.

**Parameters**

-   `source` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** merge properties from
-   `target` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** merge properties into

Returns **Void** 
