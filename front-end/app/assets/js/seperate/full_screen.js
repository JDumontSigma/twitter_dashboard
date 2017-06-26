'use strict';

const fullscreen = document.getElementById('go_fullscreen'),
      fullscreen_container = document.getElementById('go_fullscreen_container');
if( typeof(fullscreen) != 'undefined' && fullscreen != null ) {
  fullscreen.addEventListener('click', (event) => {
    event.preventDefault();//stop the button click
    launchIntoFullscreen(document.documentElement);
    fullscreen_container.classList.add('hide');
  });
}


function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}