var expect = require('chai').expect;

describe('Constants', function () {

	var Manager = require('../');

	after(function(){
		Manager.reset();
	})

	it('Constants from multiple modules are merged', function (done) {
		Manager.constants([
			require('./fixtures/constants.a'),
			require('./fixtures/constants.b')
		]);

		expect(Manager.Constants).to.exist;
		expect(Manager.Constants).to.have.property('FOO', 'baz');
		expect(Manager.Constants).to.have.property('BAR', 'foo');

		done();

	});

});
