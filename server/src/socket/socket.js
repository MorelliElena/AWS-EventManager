const {createServer} = require("http");
const {Server} = require("socket.io");
const PORT = 5005
const notifyController = require('../controllers/notificationController');

module.exports = function(app) {

    const httpServer = createServer(app);
    let onlineUsers = [];

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    const addNewUser = (userId, socketId) => {
        if(!onlineUsers.some(user => user.userId === userId)){
            onlineUsers.push({userId, socketId})
            console.log(socketId)
        }
        io.to(socketId).emit("checkNotification")
    }

    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
    }

    const getUser = (userId) => {
        return onlineUsers.find(user => user.userId === userId)
    }

    const createNotification = (sender, eventId, name, type, msg, followers) => {
        console.log(onlineUsers)
        console.log(followers)
        //let senderUsers = followers.map(follower => follower.id_user)
        let onlineSender = onlineUsers.map(user => user.userId)
       followers.forEach(user => {
            notifyController.updateUserInterests(user, eventId, type)
            if(onlineSender.includes(user)){
                let result = notifyController.createNotification(eventId, name, sender, user, type, true, msg)
                let _id = result.notify_id
                let date = result.date
                io.to(getUser(user).socketId).emit("sendNotification", {
                    eventId,
                    name,
                    date,
                    read:false,
                    msg,
                    type,
                    _id})
            } else {
                notifyController.createNotification(eventId,name, sender, user, type, false, msg)
            }
       })
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

        socket.on("notification", ({sender, eventId, title, type, text, followers}) =>{
            createNotification(sender, eventId, title, type, text, followers)
        })

    });

    httpServer.listen(5005, function () {
        console.log('SOCKET server started on port ' + PORT);
    });
}