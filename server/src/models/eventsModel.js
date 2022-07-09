module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const EventSchema = new Schema({
        name: String, // String is shorthand for {type: String}
        desc: String,
        date_start: Date,
        date_finish: Date,
        img: String,
        location: {
            address: String,
            city: String,
            province: String
        },
        tag: [String],
        booking: [{
            date: Date,
            n_participants: Number,
            max_participants: Number,
        }],
        full: Boolean,
        owner: String,
        status:String,
        followers:[{
            id_user: String,
            book: Number,
        }],
        tot_participants: Number
    });
    return mongoose.model('eventmodel', EventSchema, 'events');
};
