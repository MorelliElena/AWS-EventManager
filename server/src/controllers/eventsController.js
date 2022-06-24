var mongoose = require('mongoose');
Events = require("../models/eventsModel.js")(mongoose);
Util = require("../daysUtil");

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
                    description: 'Evento non trovato'
                });
            } else {
                res.json(event);
            }
        }
    });
};

exports.updateParticipants = function (req, res) {
    const p = req.body.old_part + req.body.participants
    Events.findOneAndUpdate({_id:req.body.eventId, "booking._id": req.body.bookingId},
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

exports.deleteParticipants = function (req, res) {
    Events.findOne({"_id":req.body.eventId, "booking._id": req.body.bookingId}, {"booking.$":1},
        function (err, booking){
        if(err){
            res.send(err);
        } else {
            const old = booking.booking[0].n_participants
            console.log(old)
            Events.findOneAndUpdate({_id:req.body.eventId, "booking._id": req.body.bookingId},
                {$set:{"booking.$.n_participants": old - req.body.participants}},
                {useFindAndModify:false},function (err){
                    if (err) {
                        res.status(451).send({
                            description: 'Eliminazione fallita. Riprova più tardi'
                        });
                    } else {
                        res.send({
                            description: 'Eliminazione avvenuta con successo'
                        });
                    }
                }
            )
        }
    })
}

exports.creation = function (req, res) {
    let eventId = mongoose.Types.ObjectId()
    const booking = []
    console.log(req.body)
    Util.getDaysList(req.body.ds, req.body.df).map(e => {
            const obj = {
                "date": e,
                "n_participants":0,
                "max_participants": req.body.capacity
            }
            booking.push(obj)
        }
    )
    const event = {
        "_id": eventId,
        "name": req.body.title,
        "desc":req.body.desc,
        "date_start": req.body.ds,
        "date_finish": req.body.df,
        "location": {
            "address": req.body.address,
            "city": req.body.city,
            "province": req.body.province
        },
        "img":req.body.img,
        "tag": req.body.tag,
        "booking":booking,
        "owner": req.body.owner_id,
        "full":false}
    Events.create(event, function (err) {
        if (err)
            res.send({
                description: err
            });
        else {
            res.status(200).send({
                description: 'Evento creato correttamente',
                id: eventId
            })
        }
    });
}

exports.getOwnerEvents = function (req, res) {
    console.log(req.params)
    Events.find({owner:req.params.id}, {useFindAndModify:false}, function (err, event) {
        if (err)
            res.send(err);
        else {
            res.json(event);
        }
    })
}
