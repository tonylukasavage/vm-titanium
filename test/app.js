var should = require('should'),
	vm = require('vm-titanium');
require('ti-mocha');

var cache = {};

function __(name) {
	if (cache[name]) { return cache[name]; }
	cache[name] = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'fixtures', name).read().text;
	return cache[name];
}

describe('runInThisContext', function(done) {

	it('returns math', function(done) {
		// sync
		vm.runInThisContext(__('math.js')).should.equal(6);

		// async
		vm.runInThisContext(__('math.js'), function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});

	it('creates Ti.UI.Window', function(done) {
		vm.runInThisContext(__('window.js'), function(err, result) {
			should.not.exist(err);
			result.should.equal('#f00');
			done();
		});
	});

});

describe('runInContext', function(done) {

	it('returns math', function(done) {
		vm.runInContext(__('math.js'), vm.createContext(), function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});
});

describe('runInNewContext', function(done) {

	it('returns math', function(done) {
		vm.runInNewContext(__('math.js'), function(err, result) {
			should.not.exist(err);
			should(result).equal(6);
			done();
		});
	});
});

mocha.run();