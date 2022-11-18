
function addUser(){
    var nameUser = document.getElementById("userName").value;
    localStorage.setItem("nome", nameUser);
    window.location="room.html";
}