const mongoose = require("mongoose");
Tags = require("../models/tagsModel.js")(mongoose);

exports.tag_list = function(req, res) {
    Tags.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};