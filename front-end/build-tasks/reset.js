/**
 * Empty out the folders
 */

'use strict';

module.exports = (paths, gulp, plugins) => {
   return (callback) => {
      return require('del')([paths.build, paths.server],{force: true} , callback);
   };
};