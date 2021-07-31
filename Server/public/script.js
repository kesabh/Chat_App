let inputText = document.querySelector('.chat-input');
let chatWindow = document.querySelector(".chats") ; 
let selfName = document.querySelector('.self .name') ; 
let username = prompt("Enter your name ") ; 

selfName.textContent = username ; 

inputText.addEventListener('keypress', function(e) {
    if (e.key == "Enter" && inputText.value) {

        let content = inputText.value;
        let div = document.createElement('div');
        div.textContent = username + " : " + content;
        div.classList.add("chat");
        div.classList.add("right");

        chatWindow.appendChild(div);
        inputText.value = "" ; 
        
        socket.emit( "sendMessage" , { username : username , message : content  } ); 
    }
})