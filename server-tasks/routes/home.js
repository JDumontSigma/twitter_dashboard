'use strict';

const express = require('express'),
      home = express.Router(),
      path = require('path');

home.get('/', ( req, res ) => {
   res.render('index');
});

home.get('/dashboard', ( req, res ) => {
      res.render('dashboard');
});

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