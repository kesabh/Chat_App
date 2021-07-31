let others = document.querySelector(".others")

socket.emit("userIsConnected", username) ; 

socket.on("userJoined", function(userObj){

        let div = document.createElement('div');
        div.textContent = userObj.username + " has joined the chat " ; 
        div.classList.add("chat");
        div.classList.add("join");
        chatWindow.appendChild(div);

        addUserToOnlineList( userObj ) ; 
}) ; 


socket.on( "userLeft", function(userObj){
        let div = document.createElement('div');
        div.textContent = userObj.username + " has left the chat " ; 
        div.classList.add("chat");
        div.classList.add("leave");

        chatWindow.appendChild(div);
        removeFromOnlineList(userObj) ; 
}) ; 

socket.on("sendMessage" , function(data){
    let content = data.message;
    let div = document.createElement('div');
    div.textContent = data.username + " : " + content;
    div.classList.add("chat");
    div.classList.add("left");

    chatWindow.appendChild(div);
}) ; 


socket.on("for-self", function(users){
        for(let i =  0 ; i < users.length ; i++){
                if( users[i].id != socket.id ){
                        others.innerHTML += `<div class="other-user" id="${users[i].id}">
        <div class="icon"><i class="fa fa-user"></i></div>
        <div class="name"> ${users[i].username} </div>
</div>`
                }
        }
})




function addUserToOnlineList(userObj){

        others.innerHTML += `<div class="other-user" id="${userObj.id}">
        <div class="icon"><i class="fa fa-user"></i></div>
        <div class="name"> ${userObj.username} </div>
</div>`
        
}

function removeFromOnlineList(userObj){
        document.querySelector(`#${userObj.id}`).remove() ; 
}