'use strict';

module.exports = (paths, themes, gulp, plugins) => {
   const fs = require('fs'),
         modernizr = require('modernizr');

   return (callback) => {
      modernizr.build({
         'feature-detects': [
            'css/flexbox'
         ],
         'options': [
            'setClasses'
         ]
      }, (result) => {
         fs.writeFileSync(`${paths.entry}/assets/js/lib/modernizr.js`, result);
         callback();
      });
   };
};