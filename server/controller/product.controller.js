require('../models/product');

const mongoose = require('mongoose');
const _ = require('lodash');
// const nodemailer = require("../config/nodemailer.config");

const Product = mongoose.model('Product');

module.exports.addNewProduct = async (req,res,next) => {
    if(req.user.userEmail != 'admin@gmail.com'){
      let productCount = await Product.find({productAddedBy:req.body.productAddedBy}).sort({"createdAt": -1});;
      if(productCount.length >=6){
          let del = await Product.deleteOne({_id:productCount[productCount.length-1]._id});
      }
    }
    else if(req.user.userEmail == 'admin@gmail.com'){
      let productCount = await Product.find({productAddedBy:req.body.productAddedBy}).sort({"createdAt": -1});;
      if(productCount.length >=3){
          let del = await Product.deleteOne({_id:productCount[productCount.length-1]._id});
      }
    }
    
    // let product = await Product.findOne({ productName: req.body.productName });
    // if (product) {
    //     return res.status(400).send({message:'Product already exisits!'});
    // } else {
    product = new Product(_.pick(req.body, ['productName', 'productCategory','productSubCategory', 'productPrice','productDescription',
    'productRating','productTotalOrders','productStatus','productFor','productImage','productAddedBy']));
    await product.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send({productId:product._id,message:'Product Added Successfully'});
    });
    // }
}

module.exports.getAllProducts = async (req,res,next) => {
    const details=req.body;
    let query1,query2,query3,query4,query5;
    for(const key  in details){
      if(key=="productName"){
        query1 = {productName:{$regex:`^${req.body.productName}`}};
      }
      else if(key=="minPrice" || key=="maxPrice"){
          if(req.body.minPrice != null && req.body.maxPrice != null){
            query2 ={$and:[{productPrice:{$gte:req.body.minPrice}},{productPrice:{$lte:req.body.maxPrice}}]};
          }
      }

      else if(key=="productCategory"){
        if(details.productCategory.length===0){
        query3 ={productCategory:{$exists: true, $nin:req.body.productCategory}}
          }
          else{
        query3 ={productCategory:{$exists: true, $in:req.body.productCategory}}   
          }
        }


      else if(key=="productSubCategory"){
        if(details.productSubCategory.length===0){
          query4 ={productSubCategory:{$exists: true, $nin:req.body.productSubCategory}}
            }
            else{
          query4 ={productSubCategory:{$exists: true, $in:req.body.productSubCategory}}   
            }
      }

      else if(key=="productFor"){
        if(details.productFor.length===0){
          query5 ={productFor:{$exists: true, $nin:req.body.productFor}}
            }
            else{
          query5 ={productFor:{$exists: true, $in:req.body.productFor}}   
            }
      }

      else{
        console.log('Invalid key');
      }
    }
    let query=Object.assign({$or:[{productAddedBy:'admin@gmail.com'},{productAddedBy:req.user._id}]},query1,query2,query3,query4,query5);
    await Product.aggregate([
      {
        $match:query
    },{ $unset: [ "createdAt", "updatedAt" ] }]).exec(function(error,result){
        if(error) {
          return res.status(500).send(error);
    }
    if(result.length <= 0){
        return res.status(200).send({data:result,message:'No Products Found'});
    }else{
        return res.status(200).send({data:result,count:result.length,message:'All Products fetched Successfully'});
    }
    }); 

    // let products = await Product.find({productStatus:true});
    // if(!products){
    //     return res.status(400).send({message:'Products Not Found'});
    // }
    // res.status(200).send({data:products,message:'All Products fetched Successfully'});
}

module.exports.getProductDetail = async (req,res,next) => {
    let product = await Product.findOne({ _id: req.params.id },{"createdAt":0,"updatedAt":0});
    if (!product) {
        return res.status(400).send({message:'Product not found'});
    }
    res.status(200).send({data:product,message:'Product Details fetched Successfully'});
}

module.exports.deleteProduct = async (req,res,next) => {
  let product = await Product.findOne({ _id: req.params.id },{"createdAt":0,"updatedAt":0});
  if(!product){
    return res.status(400).send({message:'Product not foundd'});
  }
  else if(product.productAddedBy != req.user._id  && req.user.userEmail != "admin@gmail.com"){
    return res.status(400).send({message:'Product not found'});
  }
  let pro = await Product.deleteOne({_id: req.params.id});
  res.status(200).send({message:'Product Deleted Successfully'});
}
