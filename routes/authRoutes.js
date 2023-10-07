const express = require('express');
const router = express.Router();
const app = express();
const authController = require('../controllers/Auth/authController');
// const {
//     authValidation
// }= require('../validations/authValidation.js')

//login page
router.get('/', authController.login);     

router.post('/login',authController.checkLogin);

module.exports = router;

