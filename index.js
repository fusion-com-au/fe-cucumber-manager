var objectPath = require('object-path'),
	debug = require('debug')('fe-cucumber-manager');

/**
 * Main class
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
	this.Constants = {};
	this.Helpers = [];
	this.Selectors = [];
	this.Phrases = [];
	this.Store = objectPath({});
	this.Api = null;
}

/**
 * Simple object merge reduce function
 * @param  {[type]} result [description]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
Manager.reduceMerge = function(result, source) {
	Object.keys(source)
		.forEach(function (name) {
			result[name] = source[name];
		});
	return result;
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
	this.Selectors = sources.reduce(Manager.reduceMerge, this.Selectors);
	return this;
};

/**
 * Load up sources of constants.
 * @param  {Array} sources objects containing constants.
 * @return {[type]}         [description]
 */
Manager.prototype.constants = function(sources) {
	this.Constants = sources.reduce(Manager.reduceMerge, this.Constants);
	return this;
};

/**
 * Set some initial values in the Global value store.
 * @param  {String|Array} key   valid key for npm:object-path
 * @param  {Any} value
 * @return {Manager}
 */
Manager.prototype.store = function(key, value) {
	var inValid = key.constructor.name !== 'string' || key.constructor.name !== 'Array';

	if (inValid) {
		throw new Error('Manager.store(key, value). Key must be an Array or a string');
	}

	this.Store.set(key, value);
	return this;
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
Manager.prototype.prepareStringForXpathUsage = function (str) {
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
	return Array.slice.call(arguments).join('');
};


module.exports = new Manager();
