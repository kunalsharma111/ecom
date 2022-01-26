const router = require("express").Router();

const auth = require('../middleware/auth');

const { addNewProduct,getAllProducts,getProductDetail } = require('../controller/product.controller');
const { productValidator,productValidationResult } = require('../validators/product.Validation');

router.post('/add-product',auth,productValidator, productValidationResult ,addNewProduct);
router.post('/get-all-products',auth,getAllProducts);
router.get('/get-product-detail/:id',auth,getProductDetail);

module.exports = router;