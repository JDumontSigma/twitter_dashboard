'use strict';

let currentPos = 15,
    direction = 'up',
    bpm = 60,
    heartRate = 45,
    xPos = 250,
    fontSize = 100,
    reductionRate = 2,
    adaptiveInterval;

export function Heart_Beat(){

   let heart = document.getElementById('heartbeat'),
      imgCount = 30;

    if( typeof(heart) != 'undefined' && heart != null ) {
        heart = heart.getContext('2d');
    }
    
   let img = `heart-${currentPos}`,
       currentImg = document.getElementById(img);

   if(bpm < 100){
      xPos = 255;
   } else {
      xPos = 250;
   }
   heart.clearRect( 0, 0, 500, 450 );//Empty the rectangle
   heart.drawImage( currentImg, 0, 0 );
   heart.font = `bold ${fontSize}px Lato`;
   heart.textAlign = 'center';
   heart.fillStyle = 'white';
   heart.fillText(`${bpm}`, xPos, 240);

   if(direction === 'up') {
      currentPos++;
      fontSize++;
      if(currentPos === imgCount){
         direction = 'down';
      }
   } else { 
      fontSize--;
      currentPos--;
      if(currentPos === 15) {
         direction = 'up';
      }
   }

   setTimeout(() => {
      Heart_Beat();
   }, heartRate);
}

export function Heart_Beat_Control (interval) {
    adaptiveInterval = interval;
    setTimeout(() => {
        if( bpm > 60 ) {
            bpm = bpm - reductionRate;//reduce heartbeat by 2 every interval
        } else {
            bpm = 60;
        }
        BPM_Control( bpm, interval );
        Heart_Beat_Control( adaptiveInterval );
    }, interval);
}

export function Heart_Beat_Increase () {
    bpm = bpm + 4;
}

function BPM_Control ( bpm, interval ) {
    if ( bpm <= 60 ) {
        heartRate = 45;
        reductionRate = 2;
        adaptiveInterval = interval * 2;
    } else if ( bpm > 60 && bpm < 80 ) {
        heartRate = 40;
    } else if ( bpm > 80 && bpm < 100 ) {
        heartRate = 35;
    } else if ( bpm > 100 && bpm < 120 ) {
        heartRate = 30;
    } else if ( bpm > 120 && bpm < 140 ) {
        heartRate = 25;
    } else if ( bpm > 140 && bpm < 160 ) {
        heartRate = 20;
    } else if ( bpm > 160 && bpm < 180 ) {
        heartRate = 15;
    } else if ( bpm > 180 ) {
        heartRate = 10;
        
    }
    if ( bpm > 200 ) { 
        reductionRate = reductionRate * 2;
        adaptiveInterval = interval / 2;
    }
}