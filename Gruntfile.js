module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		ti_run: {
			all: {
				files: {
					'tmp/all/Resources': ['test/*', 'vm-titanium.js', '__context.js',
						'node_modules/should/should.js', 'node_modules/ti-mocha/ti-mocha.js']
				}
			}
		},
		clean: {
			src: ['tmp']
		}
	});

	// Load grunt plugins for modules
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-titanium');

	// Register tasks
	grunt.registerTask('default', ['clean', 'ti_run']);

};
