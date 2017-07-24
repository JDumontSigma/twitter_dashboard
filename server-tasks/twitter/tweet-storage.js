'use strict';

const jsonfile = require('jsonfile'),
      path = require('path');

const file = path.resolve(__dirname, '../../local-storage/tweetData.json');//server storage

module.exports = {
   Tweet_Storage: ( tweetCollection ) => { //take through the tweet object
      jsonfile.writeFile( file, tweetCollection, { spaces: 2 }, ( error ) => { //write to the file
         if( error !== null ) { 
            console.log( error );
         } else {
            console.log( 'Storage Updated Successfully' );
         }
      });
   }
}