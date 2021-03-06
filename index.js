var objectPath = require('object-path'),
	debug = require('debug')('fe-cucumber-manager');

/**
 * Initialiser
 * @private
 */
function reset() {
	this.Constants = {};
	this.Helpers = [];
	this.Selectors = [];
	this.Phrases = [];
	this.Store = objectPath({});
	this.Api = null;
	return this;
};


/**
 * Main class
 * @return {Manager}
 *
 * @example
 * 	var CucumberManager = require('fe-cucumber-manager');
 *
 * // test/e2e/steps/steps.js
 * module.exports = function () {
 * 	CucumberManager
 * 		.api(this)
 * 		.constants([
 * 			require('fe-nightwatch-cucumber/constants'),
 * 			require('./constants'),
 * 		])
 * 		.selectors([
 * 			require('fe-nightwatch-cucumber/selectors/forms'),
 * 			require('./selectors/forms.custom'),
 * 			...
 * 		])
 * 		.phrases([
 * 			require('fe-nightwatch-cucumber/phrases/forms'),
 * 			require('./phrases/forms.custom'),
 * 			...
 * 		]);
 * }
 */
function Manager () {
	reset.call(this);
}

Manager.InvalidStoreKeyException = 'Manager.store(key, value). Key must be an Array or a string';

/**
 * Simple object merge function, overwrites existing properties.
 * @param  {Object} source merge properties from
 * @param  {Object} target merge properties into
 * @return {Void}
 */
function reduceMerge(source, target) {
	Object.keys(source)
		.forEach(function (name) {
			target[name] = source[name];
		});
};

Manager.prototype.reset = function() {
	reset.call(this);
	return this;
};

/**
 * Sets the nightwatch api
 * @param  {Nightwatch} thing the nightwatch client api object.
 * @return {Manager}
 */
Manager.prototype.api = function(thing) {
	this.Api = thing;
	return this;
};

/**
 * Load up selector generators
 * @param  {Array} sources objects containing selector factories
 * @return {Manager}
 */
Manager.prototype.selectors = function(sources) {
	sources.forEach(function(source) {
		reduceMerge(source, this.Selectors);
	}.bind(this));
	return this;
};

/**
 * Load up sources of constants.
 * @param  {Array} sources objects containing constants.
 * @return {Manager}
 */
Manager.prototype.constants = function(sources) {
	sources.forEach(function(source) {
		reduceMerge(source, this.Constants);
	}.bind(this));
	return this;
};

/**
 * Set some initial values in the Global value store.
 *
 * Is just an [object-path](https://npmjs.org/package/object-path) object, having all the methods provided by that package.
 * @param  {String|Array} key   valid key for npm:object-path
 * @param  {Any} value
 * @return {Manager}
 * @example
 * 	var CucumberManager = require('fe-cucumber-manager');
 *
 * // test/e2e/steps/steps.js
 * module.exports = function () {
 * 	CucumberManager
 * 	  .store('foo', {
 * 	  	some: {
 * 	  		thing: {
 * 	  			deep: {
 * 	  				and: "meaningful"
 * 	  			}
 * 	  		}
 * 	  	}
 * 	  });
 * 	}
 *
 * @example
 *  CucumberManager.Store.get('foo.some.thing.deep');
 *  // {and: 'meaningful'}
 */
Manager.prototype.store = function(key, value) {
	var valid = typeof key === 'string' ||
		key.constructor.name === 'String' ||
		key.constructor.name === 'Array';

	if (!valid) {
		throw Error(Manager.InvalidStoreKeyException);
	} else {
		this.Store.set(key, value);
		return this;
	}
};

/**
 * Instantiate phrases
 * @param  {Array} sources List of factories that generate valid Cucumber.js steps.
 * @return {Manager}
 */
Manager.prototype.phrases = function(sources) {
	var api = this.Api;
	if (!api) { throw new Error('Set browser first, i.e. Manager.api(foo); ');}
	debug('Loading phrases with', api);
	sources.forEach( function (source) {
		source.call(api);
	});
};

/**
 * Formats a string for usage inside an Xpath query.
 * @param  {String} str
 * @return {String}
 */
Manager.prototype.escapeXpathString = function (str) {
	return [
		'\"',
		str.replace("'", "\'"),
		'\"'
	].join('');
};

/**
 * Sugar for [...].join('')
 * @return {String}
 */
Manager.prototype.formatSelector = function () {
	return [].slice.call(arguments).join('');
};


module.exports = new Manager();
