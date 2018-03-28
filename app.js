window.addEventListener("load" , inici , false);

function inici(){
    console.log(" FUNCIO INICI: " + inici.name);
    
   //SERVO BASE  
    slider1 = document.getElementById("range1");
    output1 = document.getElementById("range1_value");
   
    //AQUI COMENÇA LA PROVA
    
    botoGuardar1 = document.getElementById("guardarPos1");
    botoGuardar1.addEventListener("click", insertServo1_1,false);
    
    botoGuardar2 = document.getElementById("guardarPos2");
    botoGuardar2.addEventListener("click", insertServo1_2,false);
    
    botoReproduir = document.getElementById("play");
    botoReproduir.addEventListener("click", reproduir,false);
   
}



//FUNCIO: GUARDAR POSICIO_1 DEL SERVOMOTOR_1;
function insertServo1_1(){
    console.log("has clicat boto guardar posicio servo 1");
    console.log("valor de posicio 1 es : " + range1.value);
    var posicio1 = range1.value;
    console.log("s'ha guardat la posicio: " + posicio1);
    
    //guardem la posicio a la BD
     var database = firebase.database().ref().child("servo1").update({
        pos1:posicio1
       
    });
}


//FUNCIO: GUARDAR POSICIO_2 DEL SERVOMOTOR_1;
function insertServo1_2(){
    console.log("has clicat boto guardar posicio servo 2");
    console.log("valor de posicio 2 es : " + range1.value);
    var posicio2 = range1.value;
    console.log("s'ha guardat la posicio: " + posicio2);
      
    //guardem la posicio a la BD
     var database = firebase.database().ref().child("servo1").update({
        
        pos2:posicio2
    });
}


//FUNCIO PLAY , CRIDA A CONSULTA() VALORS DE LA BD, DESPRES ELS MOSTRE AMB FUNCIO CONSOLA()
function reproduir(){
    console.log("FUNCIO REPRODUIR");
    
    consulta();
    consola();
    servo1_auto();
    
}








//FUNCIO CONSOLA , ENS RETORNA ESTRUCTURA DE LA BD AMB TOTS ELS VALORS 
   function consola(){
    console.log("FUNCIO CONSOLA");
    
   var users=[];
   var db = firebase.database().ref();
   var db2 = firebase.database().ref().child("servo1").child("pos2");
   db.on("value", function (snap) {
   users=(snap.val()); 
   console.log(users);
   });
 
}

//FUNCIO QUE RECULL VALORS DE LA BD
function consulta(){
    console.log("FUNCIO CONSULTA");
    
   valor;
   var db = firebase.database().ref().child("servo1").child("pos1");
   var db2 = firebase.database().ref().child("servo1").child("pos2");
   db.once("value", function (snap) {
   valor=(snap.val()); 
   console.log("    valor1: " + valor);
   });
    db2.on("value", function (snap) {
   valor=(snap.val()); 
   console.log("    valor2: " + valor);
   });
}





















//FUNCIO: QUE ACTUE SOBRE EL SERVO_1 MANUALMENT
function servo1(){
    console.log("FUNCIO SERVO_1 MANUALMENT: " + inici.name);

    output1.innerHTML = slider1.value;
    xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function servo1() {
        if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp1.open("GET", "http://192.168.104.82:8181/set_servo1?speed=" + slider1.value, true);
  xhttp1.send();
}



//FUNCIO: QUE ACTUE SOBRE EL SERVO_1 AUTOMATICAMENT
function servo1_auto(valor, valor2){
    console.log("FUNCIO SERVO_1 AUTO: " + inici.name);
    
    
    console.log("valor: "+valor);
    console.log("valor2: "+valor2);
    
    xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function servo1() {
        if (this.readyState == 4 && this.status == 200) {
    }
  };
    
    xhttp1.open("GET", "http://192.168.104.82:8181/set_servo1?speed=" + valor, true);
    xhttp1.send();
    xhttp1.open("GET", "http://192.168.104.82:8181/set_servo1?speed=" + valor2, true);
    xhttp1.send();
    
  
}





//FUNCIO SLEEP EN MILLISEGONS 
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



//FUNCIO QUE SE LI PASSEN 2 VALORS , I FA EL BUCLE*
function bucle(valor,valor2){
    
    
    console.log("valor: "+valor);
    console.log("valor2: "+valor2);
    
   var paso;
   for (paso = 0; paso < 5; paso++) {
        console.log('--->');
        sleep(10000);
            for (paso = 0; paso < 5; paso++) {
            console.log('<---');
            };
   }
};




//FUNCIO QUE AGAFA LA IP LOCAL DE LA MAQUINA
function getIPs(callback){
     console.log("FUNCIO QUE AGAFA LA IP LOCAL DE LA MAQUINA");
    var ip_dups = {};

                //compatibility for firefox and chrome
                var RTCPeerConnection = window.RTCPeerConnection
                    || window.mozRTCPeerConnection
                    || window.webkitRTCPeerConnection;
                var useWebKit = !!window.webkitRTCPeerConnection;

                //bypass naive webrtc blocking using an iframe
                if(!RTCPeerConnection){
                    //NOTE: you need to have an iframe in the page right above the script tag
                    //
                    //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
                    //<script>...getIPs called in here...
                    //
                    var win = iframe.contentWindow;
                    RTCPeerConnection = win.RTCPeerConnection
                        || win.mozRTCPeerConnection
                        || win.webkitRTCPeerConnection;
                    useWebKit = !!win.webkitRTCPeerConnection;
                }

                //minimal requirements for data connection
                var mediaConstraints = {
                    optional: [{RtpDataChannels: true}]
                };

                var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

                //construct a new RTCPeerConnection
                var pc = new RTCPeerConnection(servers, mediaConstraints);

                function handleCandidate(candidate){
                    //match just the IP address
                    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
                    var ip_addr = ip_regex.exec(candidate)[1];

                    //remove duplicates
                    if(ip_dups[ip_addr] === undefined)
                        callback(ip_addr);

                    ip_dups[ip_addr] = true;
                }

                //listen for candidate events
                pc.onicecandidate = function(ice){

                    //skip non-candidate events
                    if(ice.candidate)
                        handleCandidate(ice.candidate.candidate);
                };

                //create a bogus data channel
                pc.createDataChannel("");

                //create an offer sdp
                pc.createOffer(function(result){

                    //trigger the stun server request
                    pc.setLocalDescription(result, function(){}, function(){});

                }, function(){});

                //wait for a while to let everything done
                setTimeout(function(){
                    //read candidate info from local description
                    var lines = pc.localDescription.sdp.split('\n');

                    lines.forEach(function(line){
                        if(line.indexOf('a=candidate:') === 0)
                            handleCandidate(line);
                    });
                }, 1000);
            }


 //FUNCIO QUE INSERTA LA IP AL HTML*
            getIPs(function(ip){
//                var li = document.createElement("li");
//                li.textContent = ip;
//
//                //local IPs
//                if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
//                    document.getElementsByTagName("ul")[0].appendChild(li);
                console.log("LA IP local DE LA MAQUINA ES: " + ip);
               
});


