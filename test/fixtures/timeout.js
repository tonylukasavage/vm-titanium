var should = require('should');

setTimeout(function() {
	foo = 'did not work';
	typeof(foo).should.equal('did not work');
}, 250);