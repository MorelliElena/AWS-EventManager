module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
        username:  String, // String is shorthand for {type: String}
        password: String,
        name: String,
        surname: String,
        birthday: Date,
        bookings:[{
           name: String,
           date: Date,
           location: {
               address: String,
               city: String,
               province: String
           }
        }],
        likes:[{
            name: String,
            date_start: Date,
            date_finish: Date,
            location: {
                address: String,
                city: String,
                province: String
            }
        }]
    });
    return mongoose.model('usermodel', userSchema, 'users');
};