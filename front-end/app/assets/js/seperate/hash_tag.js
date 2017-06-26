'use strict';

import $ from 'jquery';

export function Update_Hastag( hashtag ) {
   $('.dashboard_hashtag').html( `#${hashtag}` );
   $('.dashboard_title').html(`${hashtag} twitter dashboard`);
}