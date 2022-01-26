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

module.exports.addToCart = async (req,res,next) => {
    let user = await User.findOne({_id:req.body._id});
    if(user){
    await user.cart.push(req.body.product);
    await user.save();
    }else{
        return res.status(400).send({message:'User Does not exist'});
    }
    res.status(200).send({message:"Product Added To Cart"})
}

module.exports.getCartProducts = async (req,res,next) => {
    let user = await User.findOne({_id:req.params.id});
    if(user.cart.length <=0){
        return res.status(200).send({message:'No Product in Cart'}); 
    }else{
        return res.status(200).send({products:user.cart,message:'Cart Data Found'});
    }
}

module.exports.removeFromCart = async (req,res,next) => {
    User.updateOne({ _id: req.params.userid }, { "$pull": { "cart": { "_id": req.params.id } }}, { safe: true, multi:false }, function(err, obj) {
        return res.status(200).send({message:'Product Removed from cart'});
    });
}
