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

	it('can call setTimeout', function(done) {
		var foo = 'untouched';
		vm.runInThisContext(__('timeout.js'), function(err, result) {
			setTimeout(function() {
				foo.should.equal('untouched');
				done();
			}, 500);
		});
	});

	it('creates Ti.UI.Window', function(done) {
		// sync
		vm.runInThisContext(__('window.js')).should.equal('#f00');

		// async
		vm.runInThisContext(__('window.js'), function(err, result) {
			should.not.exist(err);
			result.should.equal('#f00');
			done();
		});
	});

	it('creates complex UI', function(done) {
		// sync
		vm.runInThisContext(__('complex.js')).should.equal(11);

		// async
		vm.runInThisContext(__('complex.js'), function(err, result) {
			should.not.exist(err);
			result.should.equal(11);
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

	it('can change/add values in a context', function(done) {
		var context = vm.createContext({
				foo: 'did not work'
			}),
			foo = 'untouched';
		vm.runInContext('newone = 123; foo = "in context"', context, function(err, result) {
			setTimeout(function() {
				foo.should.equal('untouched');
				context.newone.should.equal(123);
				context.foo.should.equal('in context');
				done();
			}, 500);
		});
	});

	it('creates Ti.UI.Window', function(done) {
		var context = vm.createContext({ bg: '#f00' });
		vm.runInContext('var win = Ti.UI.createWindow({ backgroundColor: bg });win.backgroundColor;', context, function(err, result) {
			should.not.exist(err);
			result.should.equal('#f00');
			done();
		});
	});

	it('creates complex UI', function(done) {
		var context = vm.createContext({
			Ti: Ti,
			Titanium: Titanium
		});
		vm.runInContext(__('complex.js'), context, function(err, result) {
			should.not.exist(err);
			result.should.equal(11);
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

	it('can change/add values in a context', function(done) {
		var sandbox = {
				foo: 'did not work'
			},
			foo = 'untouched';
		vm.runInNewContext('newone = 123; foo = "in context"', sandbox, function(err, result) {
			//console.log(sandbox);
			foo.should.equal('untouched');
			sandbox.newone.should.equal(123);
			sandbox.foo.should.equal('in context');
			done();
		});
	});

	it('creates Ti.UI.Window', function(done) {
		var sandbox = { bg: '#f00' };
		vm.runInNewContext('var win = Ti.UI.createWindow({ backgroundColor: bg });win.backgroundColor;', sandbox, function(err, result) {
			should.not.exist(err);
			result.should.equal('#f00');
			done();
		});
	});

	it('creates complex UI', function(done) {
		var sandbox = {
			Ti: Ti,
			Titanium: Titanium
		};
		vm.runInNewContext(__('complex.js'), sandbox, function(err, result) {
			should.not.exist(err);
			result.should.equal(11);
			done();
		});

	});

});

mocha.run();