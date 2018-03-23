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


function insertServo1_1(){
    console.log("has clicat boto guardar posicio servo 1");
    console.log("valor de posicio 1 es : " + range1.value);
    var posicio1 = range1.value;
    console.log("s'ha guardat la posicio: " + posicio1);
    
    //guardem la posicio a la BD
     var database = firebase.database().ref().child("servo2").update({
        pos1:posicio1
       
    });
}

function insertServo1_2(){
    console.log("has clicat boto guardar posicio servo 2");
    console.log("valor de posicio 2 es : " + range1.value);
    var posicio2 = range1.value;
    console.log("s'ha guardat la posicio: " + posicio2);
      
    //guardem la posicio a la BD
     var database = firebase.database().ref().child("servo2").update({
        
        pos2:posicio2
    });
}


function reproduir(){
    console.log("FUNCIO REPRODUIR");
   
    
}





























function servo1(){
    console.log("FUNCIO SERVO1(): " + inici.name);

    output1.innerHTML = slider1.value;
    xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function servo1() {
        if (this.readyState == 4 && this.status == 200) {
    }
  };
  xhttp1.open("GET", "http://192.168.104.82:8181/set_servo1?speed=" + slider1.value, true);
  xhttp1.send();
}


