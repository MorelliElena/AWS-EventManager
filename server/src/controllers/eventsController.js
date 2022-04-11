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

exports.updateParticipants = function (req, res) {
    const p = req.body.old_part + req.body.participants
    Events.findOneAndUpdate( {_id:req.body.eventId, "booking.id": req.body.bookingId},
        {$set:{"booking.$.n_participants":p}}, {useFindAndModify:false},function (err){
            if (err) {
                res.status(451).send({
                    description: 'Prenotazione fallita. Riprova più tardi'
                });
            } else {
                res.send({
                    description: 'Prenotazione avvenuta con successo'
                });
            }
        }
    )
}
