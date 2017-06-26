/**
 * CSS
 */

'use strict';

module.exports = function (paths, gulp, plugins) {

	var autoprefixer = require('autoprefixer');
	var csswring = require('csswring');
	var mqpacker = require('css-mqpacker');

	var options = {
		style: 'expanded'
	};

	// Return module
	return function () {
		gulp.src(`${paths.entry}/assets/scss/*.scss`)

			// Start sourcemaps
			.pipe(plugins.sourcemaps.init())

			// Process Sass
			.pipe(plugins.sass(options)

			// Log errors
			.on('error', plugins.sass.logError))

			// Process PostCSS
			.pipe(plugins.postcss([
				autoprefixer({
					browsers: ['> 2%', 'IE >= 8', 'iOS >= 7'],
					cascade: false,
					map: true,
					remove: true
				}),
				csswring({
					removeAllComments: true
				}),
				mqpacker({
					sort: true
				})
			]))

			// Write to files
			.pipe(plugins.sourcemaps.write('.'))
			.pipe(gulp.dest(`${paths.build}/assets/css`))
			.pipe(gulp.dest(`${paths.server}/assets/css`))

			// Reload CSS
			.pipe(plugins.filter('**/*.css'))
			.pipe(plugins.browserSync.stream());
	};
};