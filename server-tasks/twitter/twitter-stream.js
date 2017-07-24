'use strict';

//twitter modules
const Twitter = require( 'ntwitter' ),
      twitterAuth = require( '../../twitter.json' ),
      twitter = new Twitter( twitterAuth ),
      twitterTwo = new Twitter( twitterAuth );

//Info handler info
const handle = require( './tweet-handler' );

let streamHandle = '',
    streamHandleTwo = '';

//start a stream
module.exports = {
   Start_Stream: ( hashtag, io, interval, callback) => {
      loop( io, interval );
      twitter.stream( 'statuses/filter', { track: hashtag }, ( stream ) => {
         streamHandle = stream;
         stream.on( 'data', ( data ) => {//start the stream
            let image;//for media storage
            if( typeof(data.entities.media) === 'undefined' ) {//no image
                  image = 'N/A';
            } else {
                  image = data.entities.media[0].media_url_https;
            }
            let Tweet_Info = {
                  'id': data.id_str,//for usage later on
                  'name': data.user.name,//their name
                  'screen_name': data.user.screen_name,//twitter name
                  'tweet': data.text,
                  'followers':data.user.followers_count,
                  'profile': data.user.profile_image_url_https,
                  'image' : image
            }

            handle.New_Tweet( io, Tweet_Info, hashtag ); //send data for storage/manipulation
            
         });

         stream.on('error', ( error ) => {
               console.log( error );
         })
      });

   
      
   },
   Stop_Stream: () => { //stop the stream and reset data
         console.log("Stream stopped");
         handle.Final_Store();
         handle.Reset_Storage();
   },
   Prime_System: ( io, hashTag, client ) => {//start the prime system
         handle.Send_Data( io, hashTag, client );
   }
};

function loop ( io, interval ) {//allow the loop to be run
      handle.scheduledUpdate( io );
      setTimeout( () => {
            loop( io, interval );//self contained looping
      }, interval);
}
