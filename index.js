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

app.get('/', checkHashtag, ( req, res ) => {
      res.render('index');
});

app.use(homeRoute);
app.use(errorRoute.notFound);
app.use(errorRoute.errorHandler);


let hashTag = '',
    interval = '';

io.sockets.on('connection', (socket) => {
      
      socket.on( 'stop_stream', () => {
            twitter.Stop_Stream();
            hashTag = '';
      });
      
      socket.on( 'prime_system', ( callback ) =>{
            let clientID = socket.id;
            twitter.Prime_System( io, hashTag, clientID ) ;
      });

      socket.on('start_stream', (data, callback) => {//successfully sending through data
            hashTag = data.hashtag;
            interval = data.interval * 60 * 1000;//convert 10 into 10 minutes

            if(hashTag == '' || interval == ''){//make sure the variables have been set
                  callback(false);//if not the setup failed
            }else{
                  twitter.Start_Stream( hashTag, io, interval, callback );
                  setInterval( () => {
                        http.get( 'https://sigma-twitter-dashboard.herokuapp.com/' );
                  }, 300000);

                  callback(true);//setup failed!
            }
      });


});

server.listen(app.get( 'port' ), () => {
   console.log(`Server is up and running ${port}`);
});

function checkHashtag ( req, res, next ) {
      let page = '';
      if( hashTag !== '' ) {
            return res.redirect('/dashboard');
      } 
      next();
};


module.exports = checkHashtag;
