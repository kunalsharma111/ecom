const router = require("express").Router();

const auth = require('../middleware/auth');

const { createOrder,getAllOrders,getOrderForCustomer,getOrderDetails } = require('../controller/order.controller');
const { orderValidator,orderValidationResult } = require('../validators/order.validation');

router.post('/create-order',auth,orderValidator, orderValidationResult ,createOrder);
router.get('/get-all-orders',auth,getAllOrders);
router.get('/get-orders-for-customer/:id',auth,getOrderForCustomer);
router.get('/get-orders-details/:id',auth,getOrderDetails);

module.exports = router;