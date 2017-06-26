'use strict';

import $ from 'jquery';

export function Last_Update () {
   let date = new Date(),
       hour = date.getHours(),
       minutes = date.getMinutes(),
       time = 'AM';

       if ( hour >= 12 ){
         time = 'PM';
       }
       if ( minutes < 10 ) {
         minutes = `0${minutes}`;
       }
       
   $('.update .counter_total').html(`${hour}:${minutes}<span>${time}</span>`);

}