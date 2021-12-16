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
        console.log("stampa:" + req.params.id)
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