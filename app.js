const express = require("express");
const { Server } = require("socket.io");
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

let users = [];

app.use(express.static("public"));

io.on("connection", function (socket) {

    socket.on("userIsConnected", function (username) {
        let userObj = { id: socket.id, username: username };
        users.push(userObj);
        // console.log(users) ; 

        socket.broadcast.emit("userJoined", userObj);

        // update other users list for self
        socket.emit("for-self", users)

    });

    socket.on("sendMessage", function (data) {
        socket.broadcast.emit("sendMessage", data);
    })

    socket.on("disconnect", function () {
        let userObj;
        let remainingUsers = users.filter(function (user) {
            if (user.id == socket.id) {
                userObj = user;
                return false;
            }
            else {
                return true;
            }
        });

        users = remainingUsers;
        socket.broadcast.emit("userLeft", userObj);
    })
})



let port = process.enc.PORT || 5500;
server.listen(port, function () {
    console.log("Server started at port :  " + port);
});

// app.get("/", function(request, response){
//     response.send("Hello world ") ; 
// })