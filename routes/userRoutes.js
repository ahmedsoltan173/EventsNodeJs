const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/user/userController');
// const {
//     uploadAvatar
// }= require('../services/uploadImage');



// uploadImage
// const multer=require('multer');

// //configure multer
// var storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'storage/images')
//     },filename:function(req,file,cb){
//         cb(null,file.fieldname+'-'+Date.now())
//     }
// })

// var upload =multer({storage:storage})


router.get('/profile',userController.profile);

router.post('/uploadAvatar',userController.uploadAvatar);     

module.exports = router;            

