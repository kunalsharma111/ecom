require('../models/order');
require('../models/product');

const mongoose = require('mongoose');
const _ = require('lodash');
// const nodemailer = require("../config/nodemailer.config");

const Order = mongoose.model('Order');
const Product = mongoose.model('Product');

module.exports.createOrder = async (req,res,next) => {
    order = new Order(_.pick(req.body, ['orderById','orderBy','orderDate','productOrderedId','productName','productDescription','productImage','orderPrice','orderRating']));
    await order.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({data:order,message:'Order Placed Successfully'});
    });
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

