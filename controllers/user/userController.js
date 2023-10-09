const { validationResult } = require('express-validator');
const User = require('../../models/User');
const { localsName } = require('ejs');
// uploadImage
const multer = require('multer');



// Configure multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/avatar');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now()+".png");
  },
});

var upload = multer({ storage: storage });





// Upload user avatar
const uploadAvatar = (req, res) => {
    upload.single('avatar')(req, res, function (err) {
      if (err) {
        // Handle error during file upload
        req.flash('errors', 'File upload failed'+err);
        return res.redirect('/user/profile');
      }
  
      if (!req.file) {
        // Handle error when no file is uploaded
        req.flash('errors', 'File upload has an error. Please try again.');
        return res.redirect('/user/profile');
      }
  
      let newFields = {
        image: req.file.filename
      };
  
      User.updateOne({ _id: req.user.id }, newFields)
        .then((image) => {
          req.flash('info', 'Uploaded Successfully');
          res.redirect('/user/profile');
        })
        .catch((err) => {
          req.flash('errors', 'File upload has an error. Please try again.');
          res.redirect('/user/profile');
        });
    });
  };





const profile=(req,res)=>{
    res.render('Auth/profile',{
        user:req.user,
        error:req.flash('errors'),
        message:req.flash('info')
        
    })

}





module.exports={
    uploadAvatar,
    profile
}