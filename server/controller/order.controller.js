require('../models/order');
require('../models/product');
require('../models/user');

const mongoose = require('mongoose');
const _ = require('lodash');
// const nodemailer = require("../config/nodemailer.config");

const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

module.exports.createOrder = async (req,res,next) => {
    let orderIds = [];
    let or = await Order.find({orderById:req.body.orderById}).sort({"createdAt": -1});
    if(or.length >= 25){
        for(let i=0;i<req.body.orders.length;i++){
            let del = await Order.deleteOne({_id:or[or.length-1]._id});
            or = await Order.find({orderById:req.body.orderById}).sort({"createdAt": -1});
        }
    }
    for(let i=0;i<req.body.orders.length;i++){
        order = new Order(_.pick(req.body.orders[i], ['orderById','orderBy','orderDate','productOrderedId','productName','productDescription','productImage','orderPrice','orderRating']));
        orderIds.push(order._id);
        await order.save((err)=>{
            if(err){
                res.status(500).send({ message: err });
                return;
            }else{
                User.updateOne({ _id: req.body.orderById }, { "$pull": { "cart": { "_id": req.body.orders[i].productOrderedId } }}, { safe: true, multi:false }, function(err, obj) {     
            });
            }
        }); 
    }

    res.status(200).send({data:orderIds,message:'Order Placed Successfully'});



    // order = new Order(_.pick(req.body, ['orderById','orderBy','orderDate','productOrderedId','productName','productDescription','productImage','orderPrice','orderRating']));
    // await order.save((err)=>{
    //     if(err){
    //         res.status(500).send({ message: err });
    //         return;
    //     }else{
    //     User.updateOne({ _id: req.body.orderById }, { "$pull": { "cart": { "_id": req.body.productOrderedId } }}, { safe: true, multi:false }, function(err, obj) {
    //     res.status(200).send({data:order,message:'Order Placed Successfully'});     
    //     });
    //     }
    // });
}

module.exports.getAllOrders = async (req,res,next) => {
    let orders = await Order.find();
    if(!orders){
        return res.status(400).send({message:'Orders Not Found'});
    }
    res.status(200).send({data:orders,message:'All Orders fetched Successfully'});
}

module.exports.getOrderForCustomer = async (req,res,next) => {
    let orders = await Order.find({ orderById : req.params.id });
    if (!orders) {
        return res.status(400).send({message:'Orders not found'});
    }
    res.status(200).send({data:orders,message:'Orders fetched for customer Successfully'});
}

module.exports.getOrderDetails = async (req,res,next) => {
    let order = await Order.findOne({ _id : req.params.id });
    if (!order) {
        return res.status(400).send({message:'Order not found'});
    }
    res.status(200).send({data:order,message:'Orders fetched for customer Successfully'});
}

module.exports.deleteOrder = async (req,res,next) => {
    let order = await Order.deleteOne({_id: req.params.id});
    if(!order){
        return res.status(400).send({message:'Order not found'});
    }
    res.status(200).send({message:'Orders Deleted Successfully'});
}

