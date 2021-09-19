var mongoose = require('mongoose');
Events = require("../models/eventsModel.js")(mongoose);

exports.list_events = function(req, res) {
    Events.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};