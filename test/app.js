var should = require('should'),
	vm = require('vm-titanium');
require('ti-mocha');

describe('vm-titanium', function() {

	it('runInNewContext', function(done) {
		vm.runInNewContext('1 + 2 + 3', function(err, result) {
			if (err) { done(err); }
			console.error(result);
			should(result).equal(6);
			done();
		});
	});

});

mocha.run();