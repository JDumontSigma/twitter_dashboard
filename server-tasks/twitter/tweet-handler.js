'use strict'; 

const _ = require( 'lodash' );

//storage 
const store = require('./tweet-storage');
//Number/string based variables
let tweetLimit = 10000,
    totalFollowers = 0,
    totalTweets = 0,
    scheduledTweetTotal = 0,
    highestTweeterName = '',
    highestTweetCount = 0;

//object based variables
let tweetCollection = {
   "10000": {
      'id': 'new_tweet.id',
      'name': 'new_tweet.name',
      'screen_name': 'new_tweet.screen_name',
      'followers': 'new_tweet.followers',
      'profile_image': 'new_tweet.profile',
      'images': 'new_tweet.imag',
      'tweet_number': 1
   }
},
    tweetIds = new Array(),
    tweetNames = new Array(),
    chartLog = 0,
    chartInfo = {
        '0': {
            'total' : 0,
            'label': '0'
        }
    };
    
module.exports = {
   New_Tweet: ( io, new_tweet, hashTag ) => {

      let Repeated_Tweet = _.includes( tweetIds, new_tweet.id );//see if the tweet exist
      if( Repeated_Tweet ) { //its a double tweet
         console.log( 'Repeated tweet!' );
      } else {

         let Tweet_Format = {}; //create an empty variable for formatting tweet
         for(let prop in tweetCollection) {//for each saved record
     
            if( tweetNames.includes( new_tweet.screen_name ) ) { //the person has already tweeted
               let tweetCount = countQuantity( tweetNames, new_tweet.screen_name );

               if( tweetCount > highestTweetCount ) {//set highest tweet
                   highestTweetCount = tweetCount;
                   highestTweeterName = new_tweet.screen_name;
               }

               Tweet_Format = {
                  'id': new_tweet.id,
                  'name': new_tweet.name,
                  'screen_name': new_tweet.screen_name,
                  'followers': new_tweet.followers,
                  'profile_image': new_tweet.profile,
                  'images': new_tweet.image,
                  'tweet_number': tweetCount
               }

            } else {// new engagment
               Tweet_Format = {
                  'id': new_tweet.id,
                  'name': new_tweet.name,
                  'screen_name': new_tweet.screen_name,
                  'followers': new_tweet.followers,
                  'profile_image': new_tweet.profile,
                  'images': new_tweet.image,
                  'tweet_number': 1
               }
               totalFollowers = totalFollowers + new_tweet.followers;
               if( 1 > highestTweetCount ) {//set highest tweet
                   highestTweetCount = 1;
                   highestTweeterName = new_tweet.screen_name;
               }
            }
         }; 

            totalTweets++;
            scheduledTweetTotal++;

            tweetIds.push( new_tweet.id );
            tweetNames.push( new_tweet.screen_name );

            tweetCollection[tweetLimit] = Tweet_Format;//Set the variable
            tweetLimit--;//decrease the count
      };

      io.sockets.emit('new_tweet', { 'tweet': new_tweet, 'tweetCount': totalTweets, 'followerCount': totalFollowers, 'highTweet': highestTweeterName, 'hashtag': hashTag });
   },
   scheduledUpdate: ( io ) => { //update every set period of time
       console.log('Updating Storage');
        let date = new Date(),
            time = `${ date.getHours() }:${ date.getMinutes() }`;

       io.sockets.emit( 'scheduled_update', { 'totalTweets': scheduledTweetTotal, 'label': time } );

       chartInfo[chartLog] = { 'total': scheduledTweetTotal, 'label': time };
       chartLog++;//update arrray position

       scheduledTweetTotal = 0; // reset the total count

       store.Tweet_Storage( tweetCollection );//Store the tweet data

   },
   Reset_Storage: () => {
        tweetCollection = {
            "10000": {
                'id': 'new_tweet.id',
                'name': 'new_tweet.name',
                'screen_name': 'new_tweet.screen_name',
                'followers': 'new_tweet.followers',
                'profile_image': 'new_tweet.profile',
                'images': 'new_tweet.imag',
                'tweet_number': 1
            }
        };
        tweetIds = new Array();
        tweetNames = new Array();
        chartLog = 0;
        chartInfo = {
            '0': {
            'total' : 0,
            'label': '0'
            }
        };

        tweetLimit = 10000,
        totalFollowers = 0,
        totalTweets = 0,
        scheduledTweetTotal = 0,
        highestTweeterName = '',
        highestTweetCount = 0;


   },
   Final_Store: () => {
       console.log('Last tweets stored!')
       store.Tweet_Storage( tweetCollection );//Store the tweet data
   },
   Send_Data: ( io, hashtag ) => {
       io.sockets.emit( 'starting_data', { 
           'hashtag': hashtag,
           'tweetTotal': totalTweets,
           'followerTotal': totalFollowers,
           'tweetData': tweetCollection,
           'chartData': chartInfo
        })
   }
};


function countQuantity ( array, name ) { 
    let count = 1;

    for( let i = 0; i < array.length; i++ ) {
        if( array[i] === name ) {
            count++;
        }
    }

    return count;
}

function loop (){
      
}