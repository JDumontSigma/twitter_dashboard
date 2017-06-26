'use strict';

module.exports = (paths, gulp, plugins) => {

   return () => {
      return gulp.src(`${paths.entry}/assets/fonts/**/*`)
        .pipe(plugins.newer(`${paths.build}/assets/fonts`))
        .pipe(gulp.dest(`${paths.build}/assets/fonts`))
        .pipe(plugins.newer(`${paths.server}/assets/fonts`))
        .pipe(gulp.dest(`${paths.server}/assets/fonts`))
        .pipe(plugins.preservetime());
   };
};