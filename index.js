'use strict';
//Server Variables
const express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io')(server),
      port = process.env.PORT || '3000';

//Extra server functionality
const path = require('path'),
      logger = require('morgan'),
      bodyParse = require('body-parser'),
      compression = require('compression'),
      cons = require('consolidate');

//External route handling
const homeRoute = require('./server-tasks/routes/home'),
      errorRoute = require('./server-tasks/routes/error');

//Twitter streaming data
const twitter = require( './server-tasks/twitter/twitter-stream' );

//Server setup, port static folders
app.set('port', port);
app.use(express.static('src'));
app.use(express.static('local-storage'));

//set the view engine to html
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'html');
app.use(errorRoute.logError);
app.use(errorRoute.client);

//base rendering with custom middleware
app.get('/', checkHashtag, ( req, res ) => {
      res.render('index');
});

//other routing and error handling
app.use(homeRoute);
app.use(errorRoute.notFound);
app.use(errorRoute.errorHandler);

//base variables
let hashTag = '',
    interval = '';

io.sockets.on('connection', (socket) => { // set up socket.io for connection
      
      socket.on( 'stop_stream', () => { // for stopping the stream
            twitter.Stop_Stream();//reset content
            hashTag = '';//reset hashtag
      });
      
      socket.on( 'prime_system', ( callback ) =>{ // initial priming of the system
            let clientID = socket.id; //set up the client socket to allow direct messaging
            twitter.Prime_System( io, hashTag, clientID );//Prime the system
      });

      socket.on('start_stream', ( data, callback ) => {//successfully sending through data
            hashTag = data.hashtag; //set the hastag
            interval = data.interval * 60 * 1000;//convert 10 into 10 minutes

            if( hashTag == '' || interval == '' ){//make sure the variables have been set
                  callback(false);//if not the setup failed
            } else {
                  twitter.Start_Stream( hashTag, io, interval, callback );
                  callback(true);//setup failed!
            }
      });


});

server.listen(app.get( 'port' ), () => { // set the server to listen onto the set port
   console.log(`Server is up and running ${port}`);
});

//Extra middleware
function checkHashtag ( req, res, next ) { // pass in parameters
      let page = '';
      if( hashTag !== '' ) { //check if the hashtag variable has been set
            return res.redirect('/dashboard'); // if the tag has been set redirect to the dashboard screen
      } 
      next();//move to the next middleware
};
