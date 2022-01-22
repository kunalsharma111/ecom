const router = require("express").Router();

const { addNewUser } = require('../controller/user.controller');
const { registerValidator,registerValidationResult } = require('../validators/register.Validation');
const auth  = require('../middleware/auth');
const superadminauth = require('../middleware/roleauth');

router.post('/add-user',registerValidator,registerValidationResult,addNewUser);


module.exports = router;