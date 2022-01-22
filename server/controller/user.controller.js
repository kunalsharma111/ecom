require('../models/user');

const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require("../config/nodemailer.config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

module.exports.addNewUser = async (req,res,next) => {
    let user = await User.findOne({ userEmail: req.body.userEmail });
    if (user) {
        return res.status(400).send({message:'That user already exisits!'});
    } else {
    user = new User(_.pick(req.body, ['firstName', 'lastName','userEmail','userMobile', 'userPassword','userType','userRole','userStatus','lastLoginTime','confirmationCode']));
    await user.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send(_.pick(user, ['userName', 'userEmail','userMobile', 'userPassword','userType','userStatus','lastLoginTime']));    });
    }
}