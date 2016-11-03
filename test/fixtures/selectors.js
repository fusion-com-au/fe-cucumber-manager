var Manager = require('../../');

module.exports = {
	aThing: function () {
		return [
			'//label[contains(.,' + Manager.escapeXpathString("They're a complicated bunch") + ')]',
			'//ancestor::div[contains(@class, ' + Manager.escapeXpathString('form__field') + ')]'
		].join('');
	}
}