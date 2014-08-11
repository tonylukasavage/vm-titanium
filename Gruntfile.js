var fs = require('fs-extra'),
	path = require('path');

var TMP_DIR = 'tmp';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		titanium: {
			create: {
				options: {
					command: 'create',
					name: TMP_DIR,
					workspaceDir: '.',
					platforms: ['android','ios']
				}
			},
			build: {
				options: {
					command: 'build',
					projectDir: TMP_DIR,
					logLevel: 'info',
					platform: 'ios',
					iosVersion: '7.1'
				}
			}
		},
		clean: {
			src: [TMP_DIR]
		}
	});

	// Load grunt plugins for modules
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-titanium');

	// load test app
	grunt.registerTask('app-prep', 'Load source files into example alloy app', function() {

		var resourcesDir = path.join(TMP_DIR, 'Resources'),
			to = function(file) {
				return path.join(resourcesDir, file);
			};

		// copy in app.js
		fs.copy(path.resolve('test', 'app.js'), to('app.js'));
		fs.copy(path.resolve('test', 'fixtures'), to('fixtures'));

		// copy in vm-titanium.js and context.js
		fs.copy(path.resolve('vm-titanium.js'), to('vm-titanium.js'));
		fs.copy(path.resolve('__context.js'), to('__context.js'));

		// copy in ti-mocha and should
		fs.copy(path.resolve('node_modules', 'ti-mocha', 'ti-mocha.js'), to('ti-mocha.js'));
		fs.copy(path.resolve('node_modules', 'should', 'should.js'), to('should.js'));

	});

	// run example app
	grunt.registerTask('test', ['titanium:create', 'app-prep', 'titanium:build']);

	// Register tasks
	grunt.registerTask('default', 'test');

};
