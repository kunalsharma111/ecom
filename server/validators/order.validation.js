const { check, validationResult } = require('express-validator');

exports.orderValidationResult = (req,res,next) =>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

exports.orderValidator = [
    check('orderById')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Order By Id is required!'),
    check('orderBy')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Order By is required!'),
    check('orderDate')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Order Date is required!'),
    check('orderPrice')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Order Price is required!')
    
    
]