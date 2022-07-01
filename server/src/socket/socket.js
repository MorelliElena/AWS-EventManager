const {createServer} = require("http");
const {Server} = require("socket.io");
const PORT = 5005
const notifyController = require('../controllers/notificationController');

module.exports = function(app) {

    const httpServer = createServer(app);
    let onlineUsers = [];
    let senderUsers = ['625699ea6bae66d8e8cce8b0','61bb5ec91c8cce788c420d64']

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    const addNewUser = (userId, socketId) => {
        console.log(onlineUsers.some(user => user.userId === userId))
        if(!onlineUsers.some(user => user.userId === userId)){
            onlineUsers.push({userId, socketId})
            console.log(socketId)
        }
    }

    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
    }

    const getUser = (userId) => {
        return onlineUsers.find(user => user.userId === userId)
    }


    const createNotification = (sender, eventId, type, text) => {
        console.log(onlineUsers)
        let onlineSender = onlineUsers.map(user => user.userId)
        senderUsers.forEach(user => {
                if(onlineSender.includes(user)){

                    /*notifyController.createNotification(eventId,"prova_online", sender,
                        user,type, true, text)*/
                    io.to(getUser(user).socketId).emit("sendNotification", {
                        eventId,
                        title:"prova_title",
                        type,
                        text

                    },()=>  console.log("fatto"))
                } else {
                   /* notifyController.createNotification(eventId,"prova_offline",sender,
                        user,type, false, text)*/
                }
            }
        )

    }

    io.on("connection", (socket) => {

        socket.on("newUser", userId =>{
            addNewUser(userId, socket.id)
            console.log(onlineUsers.length)
        })

        socket.on("disconnect", () => {
            console.log("disconnected")
            removeUser(socket.id)
            console.log(onlineUsers)
        })


        socket.on("notification", ({sender, eventId, type, text}) =>{
            console.log("notify")
            createNotification(sender, eventId, type, text)
        })

    });

    httpServer.listen(5005, function () {
        console.log('SOCKET server started on port ' + PORT);
    });
}