'use strict';

//twitter modules
const Twitter = require( 'ntwitter' ),
      twitterAuth = require( '../../twitter.json' ),
      twitter = new Twitter( twitterAuth );

//Info handler info
const handle = require( './tweet-handler' );

let streamHandle ;
/**
 * Tweet information
 */

module.exports = {
   Start_Stream: ( hashtag, io, interval, callback) => {
      loop( io, interval );
      twitter.stream( 'statuses/filter', { track: hashtag }, ( stream ) => {
         stream.on( 'data', ( data ) => {
            let image;//for media storage
            if( typeof(data.entities.media) === 'undefined' ) {//no image
                  image = 'N/A';
            } else {
                  image = data.entities.media[0].media_url_https;
            }
            streamHandle = stream;
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
   Stop_Stream: () => {
         streamHandle.destroy();
         console.log("Stream stopped");
         handle.Final_Store();
         handle.Reset_Storage();
   },
   Prime_System: ( io, hashTag ) => {
         handle.Send_Data( io, hashTag );
   }
};

function loop ( io, interval ){
      handle.scheduledUpdate( io );
      setTimeout( () => {
            loop( io, interval );
      }, interval);
}