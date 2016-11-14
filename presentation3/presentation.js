console.log("presentation js");

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
        msg = JSON.parse(msg);
        //document.getElementById ('display_m2').innerText="m: "+msg+".";
        //document.getElementById ('display_m2').innerText=JSON.stringify(msg));
        el_display_m2.innerText = msg.display_m2;
        el_display_euros.innerText = msg.display_euros;
        el_display_repas.innerText = msg.display_repas;
        el_display_merci.innerText = msg.display_merci;
      };
      session.postMessage("ready");
   };
};



document.addEventListener('deviceready', onDeviceReady, false);
alert("allo");
