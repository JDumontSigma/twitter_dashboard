/**
 * Gulp Build
 */

//Gulp plugins
const gulp = require('gulp'),
      plugins = require('gulp-load-plugins')(),
      config = require('./package.json').config;

// Non-gulp modules
plugins.browserSync = require('browser-sync').create();
plugins.sequence = require('run-sequence');
plugins.stream = require('event-stream');
plugins.combine = require('stream-combiner');

/**
 * Collect tasks
 */

function fetchModule(module){
   return require(`${config.paths.tasks}/${module}`)(config.paths, gulp, plugins);
}

//tasks collections
/**
 * General tasks
 */
gulp.task('reset', fetchModule('reset'));//reset the content 
gulp.task('copyimage', fetchModule('copyimage'));//copy file
gulp.task('copyfont', fetchModule('copyfont'));//copy file
gulp.task('reload', fetchModule('reload'));//browser sync
gulp.task('watch', fetchModule('watch'));
/**
 * HTML tasks
 */
gulp.task('html', fetchModule('html/index'));
gulp.task('html-lint', fetchModule('html/lint'));

/**
 * CSS tasks
 */
gulp.task('sass', fetchModule('css/index'));
/**
 * JS tasks
 */
gulp.task('webpack', fetchModule('js/wp'));//webpack compile
gulp.task('modernize', fetchModule('js/modern'));//support for feature

/**
 * Server tasks
 */
gulp.task('server', fetchModule('nodemon'));

/**
 * Final build processes
 */
gulp.task('build', (callback) => {
   return plugins.sequence('modernize', ['webpack'], 'html', 'html-lint', 'sass', callback);
});

gulp.task('dev', ['reset'], (callback) => {
      return plugins.sequence('build', 'copyimage', 'copyfont', ['watch', 'reload'], callback);
})