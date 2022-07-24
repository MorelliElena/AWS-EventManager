const mongoose = require('mongoose');
Notify = require("../models/notificationModel.js")(mongoose);
Users = require("../models/userModel")(mongoose);
Util = require("../daysUtil");

createNotification = (eventId, name, senderId, receiverId, type, sent, msg ) => {
    let notify_id = mongoose.Types.ObjectId()
    let date = Util.getCurrentDateAndTime()
    const notification = {
        "_id": notify_id,
        "event": {
            "eventId": eventId,
            "name": name
        },
        "senderId": senderId,
        "receiverId": receiverId,
        "type":type,
        "read": false,
        "sent": sent,
        "msg":msg,
        "date": date
    }

    Notify.create(notification, function (err) {
        return !err;
    });
    return {notify_id, date}
}

getNotifications = function(req, res) {
    Notify.find({"receiverId":req.params.id}, {useFindAndModify:false}, function (err, notification) {
        if (err)
            res.send(err);
        else {
            notification.sort(function(a,b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            });
            res.json(notification);
        }
    });
}

deleteNotifications = function(req, res) {
    Notify.deleteOne({_id:req.body.notificationId}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send();
        }
    });
}

markNotifications = function (req,res) {
    console.log(req.body.notifications)
    let list = req.body.notifications.map(e => e._id)
    console.log(list)
    Notify.updateMany({_id:{$in:list}}, {$set:{"read": true}}, {useFindAndModify:false, multi:true}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send();
        }
    });
}

updateUserInterests = (userId, eventId, type) =>{
    console.log(userId + "----------------------" + eventId)
    Users.findOneAndUpdate({"_id":userId, "likes.id_event": eventId}, {$set:{"likes.$.status": type}},
        {useFindAndModify:false}, function (err) {
            if (err) {
                console.log(err)
            }
    });

    Users.updateMany({"_id":userId, "bookings.id_event": eventId}, {$set:{"bookings.$[elem].status": type}},
        { "arrayFilters": [{ "elem.id_event": eventId }],useFindAndModify:false, multi:true}, function (err) {
            if (err) {
                console.log(err)
            }
        });
}

module.exports = {
    createNotification,
    getNotifications,
    deleteNotifications,
    markNotifications,
    updateUserInterests
}