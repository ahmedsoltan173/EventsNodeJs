const express = require('express');
const router = express.Router();
const app = express();
const authController = require('../controllers/Auth/authController');
// const {
//     authValidation
// }= require('../validations/authValidation.js')

//login page
router.get('/login', authController.login);     

router.post('/login',authController.checkLogin);

router.get('/signup',authController.signup);

router.post('/signup',authController.storeSignUp);

router.get('/logout',authController.logout);

router.get('/profile',authController.profile);


module.exports = router;            

