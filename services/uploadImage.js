const multer=require('multer');

const upload = (req, res, next) => {

//configure multer
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'storage/images')
    },filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

var upload =multer({storage:storage})



const file = req.file.path;
// Process the file or save the file path to the database
// ...

res.json({ success: true, file: filePath });
}


module.exports = {
    upload
};