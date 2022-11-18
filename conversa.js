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

userName = localStorage.getItem("nome");
roomName = localStorage.getItem("roomName");
function send(){
msg = document.getElementById("msg").value;
firebase.database().ref(roomName).push({
  nome: userName,
  msg: msg,
  likes: 0
});
document.getElementById("msg").value=""
}

function getData() {
firebase.database().ref("/"+roomName).on('value', function(snapshot) 
{ document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) {
   childKey = childSnapshot.key; 
   childData = childSnapshot.val(); 
   if(childKey != "sala") {
      firebaseMessageId = childKey; 
      messageData = childData;
      console.log(firebaseMessageId+ "aa");
      console.log(messageData+"message");
      nome = messageData['nome'];
      mensagem = messageData['msg'];
      like = messageData['likes'];
      nomeComIcon ="<h4>"+nome+"<img id='icon' src='icon.png'></h4>";
      message ="<h4 class='message_h4'>"+mensagem+"</h4>"
      console.log(like);
      likeButton ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
      spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
      row = nomeComIcon+message+likeButton+spanWithTag;
      document.getElementById("output").innerHTML+=row;
  }});
});
}
getData();

function updateLike(messageId){
console.log(messageId);
buttonId = messageId;
console.log(buttonId);
like = document.getElementById(buttonId).value;
  updateLikes=Number(like)+1;
  firebase.database().ref(roomName).child(buttonId).update({
  likes : updateLikes
});
}



function logout(){
  localStorage.removeItem("nome");
  localStorage.removeItem("sala");

  window.location.replace("index.html");
}