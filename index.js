'use strict';

const express = require('express'),
      app = express(),
      http = require('http'),
      server = http.createServer(app),
      io = require('socket.io')(server),
      port = process.env.PORT || 3000;

const path = require('path'),
      logger = require('morgan'),
      bodyParse = require('body-parser'),
      compression = require('compression'),
      cons = require('consolidate');

const homeRoute = require('./server-tasks/routes/home'),
      errorRoute = require('./server-tasks/routes/error');

const twitter = require( './server-tasks/twitter/twitter-stream' );

app.use(express.static('src'));
app.use(express.static('local-storage'));

//set the view engine to html
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'html');
app.use(errorRoute.logError);
app.use(errorRoute.client);

app.use(homeRoute);

app.use(errorRoute.notFound);
app.use(errorRoute.errorHandler);

let hashTag = '',
    interval = '';

io.sockets.on('connection', (socket) => {
      console.log('Connection');
      
      socket.on( 'stop_stream', () => {
            twitter.Stop_Stream();
      });
      


      socket.on('start_stream', (data, callback) => {//successfully sending through data
            hashTag = data.hashtag;
            interval = data.interval * 60 * 100;//convert 10 into 10 minutes

            if(hashTag == '' || interval == ''){//make sure the variables have been set
                  callback(false);//if not the setup failed
            }else{
                  twitter.Start_Stream( hashTag, io, interval, callback );
                  callback(true);//setup failed!
            }
      });


});

server.listen(port, () => {
   console.log(`Server is up and running ${port}`);
});