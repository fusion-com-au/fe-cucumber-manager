var expect = require('chai').expect;

describe('Selectors', function () {

	var Manager = require('../');

	after(function(){
		Manager.reset();
	})

	it('Selectors are merged', function (done) {
		Manager.selectors([
			require('./fixtures/selectors'),
		]);

		expect(Manager.Selectors).to.be.defined;
		expect(Manager.Selectors).to.have.property('aThing');
		expect(Manager.Selectors).itself.to.respondTo('aThing');
		done();

	});

});
