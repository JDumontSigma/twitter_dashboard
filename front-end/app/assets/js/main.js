'use strict';
//Library imports
 //Import socket io
const io = require( 'socket.io-client' );

const socket = io.connect();

//functions which need calling
const Heart_Beat = require('./seperate/heart_beat'),
      Update_Counter = require('./seperate/update_counter'),
      New_Tweet = require('./seperate/new_tweet'),
      List_Update = require('./seperate/list'),
      Last_Update = require('./seperate/last_update'),
      Hash_Tag = require('./seperate/hash_tag');

//include functionality
const Full_Screen = require( './seperate/full_screen' ),
      Setup_Stream = require( './seperate/stream_setup' );

let Update_Chart;
const font_loaded = new FontFace( 'Lato', 'url(../assets/fonts/Lato-Black.ttf)' );//Make sure the font has loaded before executing JS

font_loaded.load()//the font has loaded
   .then((font) => {
      document.fonts.add( font );//Add the font to the document
      //run font dependent functions
      let check = document.getElementById('heartbeat');
      if( typeof( check ) !== 'undefined' && check != null ){
            Heart_Beat.Heart_Beat();    
      }

      check = document.getElementById('chartupdate');
      if( typeof( check ) !== 'undefined' && check != null ){
            Update_Chart = require('./seperate/chart.js'); 
      }

      Last_Update.Last_Update();
});

/**
 * Functions to call once which loop themselves
 */
Heart_Beat.Heart_Beat_Control( 6000 );

if(window.location.href.indexOf("stop") > -1 ) {
         console.log('Time to stop');
         socket.emit( 'stop_stream' );
}
if(window.location.href.indexOf("dashboard") > -1 ) {
      socket.emit('prime_system', {}, ( data ) => {
            console.log(data);
      });
}


window.onload = () => {
      
      socket.on('starting_data', ( data ) => {
            
            console.log(data);
            Hash_Tag.Update_Hastag( data.hashtag );
            Update_Counter.Update_Counter( data.tweetTotal , 'tweetCount' ); //Updates total tweets
            Update_Counter.Update_Counter( data.followerTotal, 'reach' ); //updates total reach

            for( let chartPoint in data.chartData ) {
                  Update_Chart.Update_Chart( data.chartData[chartPoint].total , data.chartData[chartPoint].label ); //update the chart
            }
            for( let tweet in data.tweetData ) {
                  New_Tweet.New_Tweet( {'tweet': data.tweetData[tweet]} ); //Update the twitter feed 
            }
            for( let i = 4; i > 0; i-- ) {
                  console.log(data.lastFive[i]);
                  List_Update.List_Update( data.lastFive[i] ); //update last 5 tweeters
            }   
      }); 
      /**
       * Updates with every tweet
       */
      socket.on('new_tweet', ( tweet ) => {
            Hash_Tag.Update_Hastag( tweet.hashtag );
            New_Tweet.New_Tweet( tweet ); //Update the twitter feed
            List_Update.List_Update( tweet.tweet.screen_name ); //update last 5 tweeters
            Update_Counter.Update_Name( tweet.highTweet, 'highest' );
            Update_Counter.Update_Counter( tweet.tweetCount , 'tweetCount' ); //Updates total tweets
            Update_Counter.Update_Counter( tweet.followerCount, 'reach' ); //updates total reach
            Heart_Beat.Heart_Beat_Increase();//Increase the heart beat
      });

      /**
       * Updates every interval
       */
      socket.on('scheduled_update', ( data ) => {
            Update_Chart.Update_Chart( data.totalTweets , data.label ); //update the chart
            Last_Update.Last_Update(); //updates the last time it was updated
      });
}




