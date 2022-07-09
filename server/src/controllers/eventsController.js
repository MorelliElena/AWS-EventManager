const mongoose = require('mongoose');
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

function updateFollower(req, update) {
    if(update) {
        const follower = {
            "_id": new mongoose.Types.ObjectId(),
            "id_user": req.body.userId,
            "book": 1
        }

        Events.findOneAndUpdate({_id: req.body.eventId, "followers.id_user": req.body.userId},
            {$inc: {"followers.$.book": 1}},
            {useFindAndModify: false}, function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    if (res === null) {
                        Events.findByIdAndUpdate({_id: req.body.eventId},
                            {$push: {"followers": follower}},
                            {useFindAndModify: false}, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                    }

                }

            })
    } else {
        Events.findOneAndUpdate({_id:req.body.eventId, "followers.id_user": req.body.userId},
            {$inc:{"followers.$.book": -1}},
            {useFindAndModify: false, multi:true}, function (err, res) {
                if (err) {
                    res.send(err);
                }
            })

    }
}

exports.updateParticipants = function (req, res) {
    Events.findOneAndUpdate({_id: req.body.eventId, "booking._id": req.body.bookingId},
        {$inc: {"booking.$.n_participants": req.body.participants, tot_participants: + req.body.participants}},
        {useFindAndModify: false}, function (err) {
            if (err) {
                res.status(451).send({
                    description: 'Prenotazione fallita. Riprova più tardi'
                });
            } else {
                res.status(200).send({
                    description: 'Prenotazione avvenuta con successo'
                });
                updateFollower(req, true)
            }
        }
    )

}

exports.deleteParticipants = function (req, res) {
    Events.findOneAndUpdate({_id: req.body.eventId, "booking._id": req.body.bookingId},
        {$inc: {"booking.$.n_participants": - req.body.participants, tot_participants: - req.body.participants}},
        {useFindAndModify: false}, function (err) {
            if (err) {
                res.status(451).send({
                    description: 'Eliminazione fallita. Riprova più tardi'
                });
            } else {
                res.status(200).send({
                    description: 'Eliminazione avvenuta con successo'
                });
                updateFollower(req, false)
            }
    })
}

exports.follower = function (req, res) {
    if(req.body.isUpdate) {
        updateFollower(req, true)
    } else {
        updateFollower(req, false)
    }
}

exports.creation = function (req, res) {
    let eventId = mongoose.Types.ObjectId()
    const booking = []
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
    Events.find({owner:req.params.id}, {useFindAndModify:false}, function (err, event) {
        if (err)
            res.send(err);
        else {
            res.json(event);
        }
    })
}

exports.cancelEvent = function (req, res) {
    Events.findByIdAndUpdate(req.body.eventId, {"status":"cancelled"}, {useFindAndModify:false},
        function (err){
            if (err) {
                res.status(451).send({
                    description: 'Eliminazione fallita. Riprova più tardi'
                });
            } else {
                res.send({
                    description: 'Eliminazione avvenuta con successo'
                });
            }
        })
}
