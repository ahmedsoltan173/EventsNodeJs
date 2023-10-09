const passport = require('passport');
const User = require('../../models/User');
const { localsName } = require('ejs');



//login user view 
const login = (req, res) => {

    res.render('Auth/login',{
        error:req.flash('error'),
        message:req.flash('success')
    });
}


const checkLogin = passport.authenticate('local.login',{
        successRedirect:'/user/profile',
        failureRedirect:'/auth/login',
        failureFlash:true,
    });



const signup = (req, res) => {
    // res.json('g');
    res.render('Auth/signup',{
        error:req.flash('error'),
    });
}


const storeSignUp = passport.authenticate('local.signup', 
                    {
                        successRedirect: '/user/profile',
                        failureRedirect: '/auth/signup',
                        failureFlash:true
                    });




const logout=(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
      });
}




module.exports = {
    login,
    signup,
    checkLogin,
    storeSignUp,
    logout
}