var expect = require('chai').expect;

describe('Store', function () {

	var Manager = require('../');

	before(function(){
		Manager.reset();
	})

	after(function(){
		Manager.reset();
	})

	it('Store should reject non Array or String keys',  function (done) {
		expect(function () {
			Manager.store(1, 1);
		}).to.throw(Error);
		expect(Manager.Store.get(1)).to.not.exist;

		done();
	});

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
