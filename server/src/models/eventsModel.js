module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var EventSchema = new Schema({
        name:  String, // String is shorthand for {type: String}
        desc: String,
        date_start: Date,
        date_finish: Date,
        n_participants: Number,
        max_participants: Number,
        img: String,
        location: {
            address: String,
            city: String,
            province: String
        },
        tag: [String],
    });
    return mongoose.model('eventmodel', EventSchema, 'events');
};
