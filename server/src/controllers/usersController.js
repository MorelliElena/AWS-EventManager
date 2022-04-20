const mongoose = require("mongoose");
Users = require("../models/userModel.js")(mongoose);

exports.checkAuthentication = function(req, res) {
    let username = req.body.username
    Users.where({username:username}).findOne(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            if (req.body.password === user.password){
                res.json(user);
            } else {
                res.status(401).send({
                    description: 'Authentication failed'
                });
            }

        }
    });
};

exports.getProfileData = function(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id)
    Users.findById(id, function (err, user) {
        if (err)
            res.send(err);
        else {
            if (user == null) {
                res.status(404).send({
                    description: 'User not found'
                });
            } else {
                res.json(user);
            }
        }
    });
};

exports.updateUserData = function(req, res) {
    let id = mongoose.Types.ObjectId(req.body.userId)
    Users.findByIdAndUpdate(id,
        {"name":req.body.name,
        "surname": req.body.surname,
        "birthday": req.body.birthday,
        "username": req.body.username,
        "password": req.body.password
        }, {useFindAndModify: false}, function (err) {
            if (err) {
                res.send({
                    description: 'Update failed. Try again later'
                });
            } else {
                res.status(200).send({
                    description: 'User updated successfully'
                })
            }
        }
    )
}

exports.updateUserBooking = function(req, res) {
    let userId = mongoose.Types.ObjectId(req.body.userId)

    Users.findById(userId, function (err, user){
            if(err){
                res.send(err);
            } else {
                const date = new Date(req.body.date)
                const isDuplicated = user.bookings.some(function (booking) {
                    return (booking.date.getTime() === date.getTime() && booking.id_event=== req.body.eventId);
                });
                if (!isDuplicated) {
                    const book = {
                        "_id": req.body.bookingId,
                        "id_event": req.body.eventId,
                        "name": req.body.name,
                        "date":req.body.date,
                        "participants": req.body.participants,
                        "location": {
                            "address": req.body.location.address,
                            "city": req.body.location.city,
                            "province": req.body.location.province
                        }
                    }

                    Users.findByIdAndUpdate(
                        req.body.userId,
                        {$push : {bookings: book}},
                        {useFindAndModify: false},
                        function(err){
                            if (err) {
                                res.send({
                                    description: 'Creazione prenotazione fallita. Riprova più tardi'
                                });
                            } else {
                                res.status(200).send({
                                    description: 'Prenotazione creata correttamente'
                                })
                            }
                        })


                } else {
                    res.status(202).send({
                        description: 'Hai già una penotazione effettuata per questo evento nella data desiderata. ' +
                            'Controlla le tue penotazioni nella sezione personale'
                    });
                }
            }

        }

    )
}

exports.deleteUserBooking = function(req, res) {
    Users.findByIdAndUpdate(req.body.userId,
        {$pull: { "bookings": {_id:req.body.bookingId}}},
        {useFindAndModify:false}, function (err) {
        if (err){
            res.send(err);
        } else {
            res.status(200).send({
                description: 'Prenotazione eliminata correttamente'
            });
        }
    })
}

exports.updateUserLike = function(req, res) {
    let userId = mongoose.Types.ObjectId(req.body.userId)
    let likeId = mongoose.Types.ObjectId()

    Users.findById(userId, function (err, user){
            if(err){
                res.send(err);
            } else {
                const isDuplicated = user.likes.some(function (like) {
                    return like.id_event=== req.body.eventId;
                });
                if (!isDuplicated) {
                    const like = {
                        "_id": likeId,
                        "id_event": req.body.eventId,
                        "name": req.body.name,
                        "date_start": new Date(req.body.ds),
                        "date_finish":new Date(req.body.df),
                        "location": {
                            "address": req.body.location.address,
                            "city": req.body.location.city,
                            "province": req.body.location.province
                        }
                    }

                    Users.findByIdAndUpdate(
                        req.body.userId,
                        {$push : {likes: like}},
                        {useFindAndModify: false},
                        function(err){
                            if (err) {
                                res.send({
                                    description: "L'Evento d'interesse non è " +
                                        "stato aggiunto correttamente. Riprova più tardi"
                                });
                            } else {
                                res.status(200).send({
                                    description: 'Evento d\'interesse aggiunto correttamente'
                                })
                            }
                        })


                } else {
                    res.status(202).send({
                        description: 'Hai già espresso un interesse per questo evento' +
                            'Controlla le tue penotazioni nella sezione personale'
                    });
                }
            }

        }

    )
}

exports.deleteUserLike = function(req, res) {
    Users.findByIdAndUpdate(req.body.userId,
        {$pull: { "likes": {_id:req.body.likeId}}},
        {useFindAndModify:false}, function (err) {
            if (err){
                res.send(err);
            } else {
                res.status(200).send({
                    description: "Evento d'interesse eliminato correttamente"
                });
            }
        })
}

exports.isEventLiked = function (req,res) {
    Users.findOne({"_id":req.body.userId, "likes.id_event": req.body.eventId}, {"likes.$":1},
        function (err, like) {
        if (err)
            res.send(err);
        else {
            if (like != null) {
                res.status(200).send()
            }
        }
    });
}
