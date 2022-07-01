const mongoose = require('mongoose');
Notify = require("../models/notificationModel.js")(mongoose);
Util = require("../daysUtil");

createNotification = (eventId, name, senderId, receiverId, type, sent, msg ) => {
    let notify_id = mongoose.Types.ObjectId()
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
        "date": Util.getCurrentDateAndTime()
    }
    Notify.create(notification, function (err) {
        return !err;
    });


}

module.exports = {
    createNotification
}