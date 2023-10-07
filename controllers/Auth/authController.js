const { validationResult } = require('express-validator');
const User = require('../../models/User');
const { localsName } = require('ejs');
const moment = require('moment');
moment().format();


//login user view 
const login=(req,res)=>{
     res.json("dd");

    // res.render('/user/login');
}


const checkLogin=(req,res)=>{
    res.json('sgg');
}












module.exports = {
    login,
    checkLogin
}