'use strict';

module.exports = (paths, gulp, plugins) => {
   return () => {
   

      plugins.watch([
         `${paths.entry}/assets/js/**/*.js`
      ], plugins.batch((events, done) => {
         return plugins.sequence('webpack', done);
      }));

      plugins.watch([
         `${paths.entry}/templates/**/*.html`
      ], plugins.batch((events, done) => {
         return plugins.sequence('html', done);
      }));

      plugins.watch([
         `${paths.entry}/assets/scss/**/*.scss`,
      ], plugins.batch((events, done) => {
         return plugins.sequence('sass', done);
      }));
   };
};