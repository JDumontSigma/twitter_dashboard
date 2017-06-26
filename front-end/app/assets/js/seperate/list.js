'use strict';

import $ from 'jquery';

export function List_Update ( name ) {
   $('.counter_list li:last').remove();
   $('.counter_list').prepend(
      `<li class="animated bounceInRight">@${name}</li>`
   );
};