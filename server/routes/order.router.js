const router = require("express").Router();

const { createOrder,getAllOrders,getOrderForCustomer } = require('../controller/order.controller');
const { orderValidator,orderValidationResult } = require('../validators/order.validation');

router.post('/create-order',orderValidator, orderValidationResult ,createOrder);
router.get('/get-all-orders',getAllOrders);
router.get('/get-orders-for-customer/:id',getOrderForCustomer);

module.exports = router;