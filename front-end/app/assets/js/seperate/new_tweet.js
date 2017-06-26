'use strict';

import $ from 'jquery'; //import jquery

export function New_Tweet ( tweetdata ) { 
    let tweetContent = Format_Content( tweetdata.tweet.tweet );
    let imgString;
    
   if( tweetdata.tweet.image === 'N/A' ) {
    imgString = '';
   } else {
    imgString = `<img src="${tweetdata.tweet.image}" alt="Picture from twitter" />`;
   }

   $('.tweetBar').prepend(`
   <section class="tweet animated bounceInDown">
         <section class="tweet_profile">
            <img src='${ tweetdata.tweet.profile }' alt="Twitter Profile Image">
            <section class="tweet_profile_details">
               <h4>
                  <span>@${ tweetdata.tweet.screen_name }</span>
                  <span>${ tweetdata.tweet.name }</span>
               </h4>
            </section>
         </section>
         <section class="tweet_content">
            <p>${ tweetContent }</p>
            ${ imgString }
         </section>
   </section>
`);
};

function Format_Content( content ) {

   let finished_content = '',
       formatted_content = content.replace(/\n/g, ' ');

       formatted_content = formatted_content.split(' ');

   for (let x = 0; x < formatted_content.length; x++) {
      let tempHolder = formatted_content[x];
      if (formatted_content[x].charAt(0) === '#') {
         //its a hashtag
         formatted_content[x] = `<span class="hashtag">${formatted_content[x]}</span>`;
      }
   }

   for(let i = 0; i < formatted_content.length; i++) {
      finished_content += formatted_content[i] + ' ';
   }
   return finished_content;
};