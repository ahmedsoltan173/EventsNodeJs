const express =require('express');
const router=express.Router();
const app=express();

router.get('/',(req,res)=>{
    // res.send("test data it working from web ");
    res.render('events/index')
});
router.get('/:id',(req,res)=>{
    res.render('events/show');
});

router.get('edit/:id',(req,res)=>{
    res.render('events/edit');
});




module.exports=router;

