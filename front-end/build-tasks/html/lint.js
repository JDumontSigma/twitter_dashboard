'use strict';

module.exports = (paths, gulp, plugins) => {
   return (callback) => {
      return gulp.src(`${paths.build}/*.html`)
             .pipe(plugins.htmlhint())
             .pipe(plugins.htmlhint.reporter('htmlhint-stylish'))
   };
};