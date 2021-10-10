var mongoose = require('mongoose');
Events = require("../models/eventsModel.js")(mongoose);


exports.list_events = function(req, res) {
    Events.find({}, function(err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
};

exports.read_event = function(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id)
    Events.findById(id, function (err, event) {
        console.log("stampa:" + req.params.id)
        if (err)
            res.send(err);
        else {
            if (event == null) {
                res.status(404).send({
                    description: 'Event not found'
                });
            } else {
                res.json(event);
            }
        }
    });
};
