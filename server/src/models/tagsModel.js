module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var TagSchema = new Schema({
        name:  String, // String is shorthand for {type: String}
        desc: String
    });
    return mongoose.model('tagmodel', TagSchema, 'tags');
};
