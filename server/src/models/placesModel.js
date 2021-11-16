module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var PlaceSchema = new Schema({
        name:  String, // String is shorthand for {type: String}
        desc: String
    });
    return mongoose.model('provincemodel', PlaceSchema, 'provice');
};
