'use strict';

module.exports = (paths, gulp, plugins) => {
   const nodemon = require('gulp-nodemon');

   return (callback) => {
      nodemon({
         script: '../index'
      })
   }
};