var should = require('should'),
	vm = require('vm-titanium');
require('ti-mocha');

describe('runInThisContext', function(done) {

	it('returns math', function(done) {
		vm.runInThisContext('1 + 2 + 3', function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});
});

describe('runInContext', function(done) {

	it('returns math', function(done) {
		vm.runInContext('1 + 2 + 3', vm.createContext(), function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});
});

describe('runInNewContext', function(done) {

	it('returns math', function(done) {
		vm.runInNewContext('1 + 2 + 3', function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});
});

mocha.run();