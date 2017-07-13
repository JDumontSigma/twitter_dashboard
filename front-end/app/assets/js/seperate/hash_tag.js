'use strict';

import $ from 'jquery';

export function Update_Hastag( hashtag ) {
   $('.dashboard_hashtag').html( `#WeaveTownTalks <br /> @WeaveOrgUk` );
   $('.logo').remove();
   $('<img class="logo" src="http://www.weave.org.uk/wp-content/uploads/2017/04/logosmall.png" alt="Weave logo">').insertBefore('.dashboard_title');
   $('.dashboard_title').html(`Weave TownTalk 3: DigitalSkills`);
}