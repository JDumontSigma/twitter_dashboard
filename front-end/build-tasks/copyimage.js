'use strict';

module.exports = (paths, gulp, plugins) => {

   return () => {
      return gulp.src(`${paths.entry}/assets/img/**/*`)
        .pipe(plugins.newer(`${paths.build}/assets/img/`))
        .pipe(gulp.dest(`${paths.build}/assets/img/`))
        .pipe(plugins.newer(`${paths.server}/assets/img/`))
        .pipe(gulp.dest(`${paths.server}/assets/img/`))
        .pipe(plugins.preservetime());
   };
};