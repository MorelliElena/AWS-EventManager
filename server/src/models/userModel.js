module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
        username:  String, // String is shorthand for {type: String}
        password: String,
        salt: String,
        name: String,
        surname: String,
        birthday: Date,
        isAdmin: Boolean,
        bookings:[{
           id_event: String,
           name: String,
           date: Date,
           participants: Number,
           status: String,
           location: {
               address: String,
               city: String,
               province: String
           }
        }],
        likes:[{
            id_event: String,
            name: String,
            date_start: Date,
            date_finish: Date,
            status: String,
            location: {
                address: String,
                city: String,
                province: String
            }
        }]
    });
    return mongoose.models['usermodel'] || mongoose.model('usermodel', userSchema, 'users');
};