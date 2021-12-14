module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
        username:  String, // String is shorthand for {type: String}
        password: String,
        name: String,
        surname: String,
        birthday: Date
    });
    return mongoose.model('usermodel', userSchema, 'users');
};