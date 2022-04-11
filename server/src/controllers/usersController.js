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
    console.log(req.body)
    Users.findById(userId, function (err, user){
            if(err){
                res.send(err);
            } else {
                const date = new Date(req.body.date)
                const isDuplicated = user.bookings.some(function (booking) {
                    return (booking.date.getTime() === date.getTime() && booking.id_event=== req.body.eventId);
                });

                console.log(isDuplicated)
                if (!isDuplicated) {
                    const book = {
                        "id_booking": req.body.bookingId,
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
                                    description: 'Booking creation failed. Try again later'
                                });
                            } else {
                                console.log("added in user")
                                res.status(200).send({
                                    description: 'Booking created successfully'
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
