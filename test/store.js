var expect = require('chai').expect;

describe('Constants', function () {

	var Manager = require('../');

	before(function(){
		Manager.reset();
	})

	after(function(){
		Manager.reset();
	})


	it('Store should be able to set intitial values',  function (done) {
		Manager
			.store('foo', { baz: 'bar'});

		expect(Manager.Store.get('foo')).to.exist;

		done();
	});

	it('Store should set deep values', function (done) {
		Manager
			.store('foo', { baz: 'bar'});

		Manager.Store.set('foo.bom.bar', 'foo');

		done();
	});

	it('Store should get deep values', function (done) {
		Manager
			.store('foo', { baz: 'bar'});

		Manager.Store.set('foo.bom.bar', 'foo');

		var result = Manager.Store.get('foo.bom.bar', 'NONE');


		expect(result).to.equal('foo');

		done();
	});


});
