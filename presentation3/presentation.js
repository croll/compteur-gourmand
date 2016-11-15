console.log("presentation js");

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

var onDeviceReady = function(){
  console.log("presentation ready");

  var session;
  var el_display_m2 = document.getElementById ('display_m2');
  var el_display_euros = document.getElementById ('display_euros');
  var el_display_repas = document.getElementById ('display_repas');
  var el_display_merci = document.getElementById ('display_merci');

  navigator.presentation.onpresent = function(presentEvent){
      session = presentEvent.session;
      session.onmessage = function(msg){
        msg = JSON.parse(b64_to_utf8(msg));

        el_display_m2.innerText = msg.display_m2;
        el_display_euros.innerText = msg.display_euros;
        el_display_repas.innerText = msg.display_repas;
        el_display_merci.innerText = msg.display_merci;
      };
      session.postMessage("ready");
   };
};



document.addEventListener('deviceready', onDeviceReady, false);
