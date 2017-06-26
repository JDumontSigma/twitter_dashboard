'use strict';

module.exports = (paths, gulp, plugins) => {
   const stream = require('webpack-stream'),
         webpack = require('webpack'),
         named = require('vinyl-named');

   const settings = {
      devtool: 'source-map',
      output: {
         chunkFilename: '[name]-[chunkhas].min.js',
         filename: '[name].min.js',
         publicPath: 'assets/js'
      },
      module:{
            rules: [{
                  test: /\.js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                        loader: 'babel-loader',
                        options: {
                              presets: ['env']
                        }
                  }
            }]
      },
      plugins: [
         new webpack.DefinePlugin({
            'process_env': {
               'NODE_ENV': 'production'
            }
         }),
         new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
         })
      ]
   };

   return () => {
      return gulp.src(`${paths.entry}/assets/js/*.js`)
             .pipe(named())
             .pipe(stream(settings, webpack))
             .pipe(gulp.dest(`${paths.build}/assets/js`))
             .pipe(gulp.dest(`${paths.server}/assets/js`))
             .pipe(plugins.browserSync.stream());
   }

};