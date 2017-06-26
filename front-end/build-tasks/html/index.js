
'use strict';

module.exports = function (paths, gulp, plugins) {

	// Child modules
	var nunjucks = require('nunjucks'),
		 path = require('path');

	var options = {
		env: new nunjucks.Environment(new nunjucks.FileSystemLoader([
			`${paths.entry}/templates`
		], {
			noCache: true
		}))
	};

	var data = {
		timestamp: Date.now(),
		paths: paths
	};

	// Add filters
	options.env.addFilter('outputFileContent', require('./filters/output-file-content'));

	// Return module
	return function () {

		return gulp.src(`${paths.entry}/templates/*.html`)
			.pipe(plugins.nunjucks.compile(data, options))
			.pipe(gulp.dest(path.resolve(paths.build, 'views')))
			.pipe(gulp.dest(path.resolve(__dirname, '../../' + paths.server + 'views')))
			.pipe(plugins.filter('**/*.html'))
			.pipe(plugins.browserSync.stream());
	};
};
