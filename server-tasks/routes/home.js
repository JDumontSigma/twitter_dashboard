'use strict';


const express = require('express'),
      home = express.Router(),
      path = require('path');


home.get('/stop', ( req, res ) => {
      res.render('stop');
})

home.get('/download', ( req, res ) => {
      let file = path.resolve( __dirname, '../../local-storage/tweetData.json' );
      res.download( file );
});

home.get('/error', ( req, res ) => {
   res.render('error');
})





module.exports = home;