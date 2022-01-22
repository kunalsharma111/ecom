const router = require("express").Router();

const { addNewProduct,getAllProducts,getProductDetail } = require('../controller/product.controller');
const { productValidator,productValidationResult } = require('../validators/product.Validation');

router.post('/add-product',productValidator, productValidationResult ,addNewProduct);
router.post('/get-all-products',getAllProducts);
router.get('/get-product-detail/:id',getProductDetail);

module.exports = router;