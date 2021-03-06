document.addEventListener('deviceready', function() {
  // erst jetzt ist APP geladen und ready um was zu tun!
  console.log( 'DEVICE READY!' );
  $( document ).ready( function() {
    console.log( 'DOM READY!' );
  });

  var bilder = [
    'das-paradies-fuer-wintersportler.jpg',
    'erlebnishotel-fendels-familienhit.jpg',
    'endlos-weite-schwuenge-ueber-perfekt-praeparierte-pisten-ziehen.jpg',
    'fruehlings-special-top-of-tyrol.jpg',
    'hotel-tia-monte-nahe-am-gletscher.jpg'
  ];

  var aktuell = 0;

  var showImage = function(i){

    // Audio abspielen:
    if(i != 0){
      $('#audio').get(0).play();
    }

    aktuell += i;
    if(aktuell < 0) aktuell = bilder.length -1; 	// wieder ans Ande
    if(aktuell > bilder.length - 1) aktuell = 0;	// wieder zum Anfang
    $('#bilder').css({
      'background-image': 'url(tirolbilder/'+bilder[aktuell]+')'
    });
  }

  var showNext = function(){showImage(1);}
  var showPrev = function(){showImage(-1);}
/*
  var audio = new Audio('Sounddogs-Preview-11579635.mp3');
  var audioPlay = function(){audio.play();}
  var audioPause = function(){audio.pause();}
*/
  $(document).on('click', '#next', showNext);
  $(document).on('click', '#prev', showPrev);
  $(document).ready(function(){
    showImage(0);		// Zeige zu Beginn das 1. Bild an
  });

  var downX = 0;

  $(document).on('touchstart', '#bilder', function(event){
    downX = event.originalEvent.touches[0].clientX;
  });

  $(document).on('touchmove', '#bilder', function(event){
    if(downX == 0) return;
    var diffX = downX - event.changedTouches[0].clientX;
    if(diffX < 0 ) $('#bilder').css({left: diffX});
    if(diffX > 0 ) $('#bilder').css({right: -diffX});
  });

  $(document).on('touchend', '#bilder', function(event){
    var diffX = downX - event.changedTouches[0].clientX;
    if (diffX < -100) {showImage(1);}
    if (diffX > 100) {showImage(-1);}
    downX = 0;
    $('#bilder').css({left:0, right:0});
  });

  $(document).on('deviceorientation', function(event){
    var diffX = event.gamma;
    if (diffX < -100) $('#bilder').css({left: diffX*5});
    if (diffX > 100) $('#bilder').css({right: diffX*5});
  });







});
