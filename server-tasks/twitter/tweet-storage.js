'use strict';

const jsonfile = require('jsonfile'),
      path = require('path');

const file = path.resolve(__dirname, '../../local-storage/tweetData.json');

module.exports = {
   Tweet_Storage: ( tweetCollection ) => {
      jsonfile.writeFile( file, tweetCollection, { spaces: 2 }, ( error ) => {
         if( error !== null ) { 
            console.log( error );
         } else {
            console.log( 'Storage Updated Successfully' );
         }
      });
   }
}