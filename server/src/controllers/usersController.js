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