'use strict';

import io from 'socket.io-client'; //import socket.io

const socket = io.connect('http://localhost:3000');// create an instance


const form = document.getElementById('setup_form');

if( typeof(form) != 'undefined' && form != null ) { //check the form exists
    form.addEventListener('submit', ( event ) => {//create submit event
    event.preventDefault(); //stop the form from submitting

    let hashtag = document.getElementById('hashtag').value,//get the input,
        updateInterval = parseInt(document.getElementById('interval').value);//Get the interval value and convert to number

    hashtag = hashtag.replace(/ /g, '');//removes whitespace

    if( hashtag === '' ){//makes sure a value has been entered
        alert( 'Please enter a hashtag for the system' );//alert the user about the situation
    } else {
        if(Number.isInteger(updateInterval)){//make sure it is a valid number

            socket.emit('start_stream', { 'hashtag': hashtag, 'interval' : updateInterval }, ( callback ) => {

                if( callback ) {
                    location.replace( '/dashboard' );
                } else {
                    alert( 'There was an issue setting the values please try again!' );
                }

            });
        }else{
            alert( 'Please enter a valid number' );
        }
        
    }//end hashtag else

    });//end listener event
}
