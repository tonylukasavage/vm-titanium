var fs = require('fs'),
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

		var resourcesDir = path.join(TMP_DIR, 'Resources');

		// copy in app.js
		fs.writeFileSync(path.join(resourcesDir, 'app.js'),
			fs.readFileSync(path.resolve('test', 'app.js')));

		// copy in vm-titanium.js and context.js
		fs.writeFileSync(path.join(resourcesDir, 'vm-titanium.js'),
			fs.readFileSync(path.resolve('vm-titanium.js')));
		fs.writeFileSync(path.join(resourcesDir, '__context.js'),
			fs.readFileSync(path.resolve('context.js')));

		// copy in ti-mocha and should
		fs.writeFileSync(path.join(resourcesDir, 'ti-mocha.js'),
			fs.readFileSync(path.resolve('node_modules', 'ti-mocha', 'ti-mocha.js')));
		fs.writeFileSync(path.join(resourcesDir, 'should.js'),
			fs.readFileSync(path.resolve('node_modules', 'should', 'should.js')));

	});

	// run example app
	grunt.registerTask('test', ['titanium:create', 'app-prep', 'titanium:build']);

	// Register tasks
	grunt.registerTask('default', 'test');

};
