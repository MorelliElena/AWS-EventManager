module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const NotificationSchema = new Schema({
        event :{
            eventId: Schema.Types.ObjectId,
            name: String
        },
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
        type: String,
        read: Boolean,
        sent: Boolean,
        msg: String,
        date: Date
    });
    return mongoose.model('notificationmodel', NotificationSchema, 'notification');
};
