'use strict';
//Library imports
 //Import socket io

const socket = io.connect(window.location.hostname);

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
            console.log('It exists')
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



