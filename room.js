const firebaseConfig = {
    apiKey: "AIzaSyC0N56N0K_zfccnpYXfeGwNT05yfZ6xQGA",
    authDomain: "talkme-c3c56.firebaseapp.com",
    databaseURL: "https://talkme-c3c56-default-rtdb.firebaseio.com",
    projectId: "talkme-c3c56",
    storageBucket: "talkme-c3c56.appspot.com",
    messagingSenderId: "71185740446",
    appId: "1:71185740446:web:10b9fdee63c0331d75c18f"
  };
firebase.initializeApp(firebaseConfig); 
var userName = localStorage.getItem("nome");
document.getElementById("userName").innerHTML="Boas Vindas "+ userName +"!!!";

function addRoom(){
    roomName = document.getElementById("roomName").value;
    firebase.database().ref("/").child(roomName).update({ /* acessa o firebase, vai na pasta principal depois cria outra pasta com o nome passado */
        sala:"sala adicionada"
    });
    localStorage.setItem("roomName", roomName);
    window.location="conversa.html";
}

function getData(){
    firebase.database().ref("/").on('value', function(snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function(childSnapshot){
            childKey=childSnapshot.key;
            roomNames = childKey;
            console.log(roomNames);
            row="<div class='divRoomName' id="+roomNames+" onclick='redirecionarParaSala(this.id)'>#"+roomNames+"</div> <br>";
            document.getElementById("output").innerHTML+=row;
        });
    });
}
getData();
function redirecionarParaSala(name){
    console.log(name);
    roomName=name;
    localStorage.setItem("roomName", roomName);
    window.location="conversa.html";
}



















function logout(){
    localStorage.removeItem("nome");
    localStorage.removeItem("sala");
    window.location="index.html";
}