const mongoose = require("mongoose");
Place = require("../models/placesModel.js")(mongoose);

exports.places_list = function(req, res) {
    Place.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};