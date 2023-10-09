const express = require('express');
const router = express.Router();
const app = express();
const authMiddleware = require('../middlewares/authMiddleware');



//auth middleware
// router.get('*',authMiddleware.auth);




module.exports = router;            
