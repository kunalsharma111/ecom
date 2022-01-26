const router = require("express").Router();

const { addNewUser,addToCart,getCartProducts,removeFromCart } = require('../controller/user.controller');
const { registerValidator,registerValidationResult } = require('../validators/register.Validation');
const auth  = require('../middleware/auth');
const superadminauth = require('../middleware/roleauth');

router.post('/add-user',auth,registerValidator,registerValidationResult,addNewUser);
router.post('/add-to-cart',auth,addToCart);
router.get('/get-cart-products/:id',auth,getCartProducts);
router.delete('/remove-from-cart/:userid/:id',auth,removeFromCart);

module.exports = router;