const passport=require('passport');
const localStratgy=require('passport-local');
const User=require('../models/User');


//saving user object in the session 
passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id)
        .then((user)=>{
                done(null,user);
            
        }).catch((err)=>{
                done(err,false);
            
        })
});
//sign up 
passport.use('local.signup', new localStratgy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash('error', 'Passwords do not match'));
    }else{
        User.findOne({email:username})
        .then((user)=>{
                // if(err){
                //     return done(err)
                // }
                if(user){
                    return done(null,false,req.flash('error','Email Already Used'));
                }
    
                if(!user){
                    //create user 
                    let newUser=new User();
                    newUser.email=req.body.email;
                    newUser.name=req.body.name;
                    newUser.password=newUser.hashPassword(req.body.password);
                    newUser.phone=req.body.phone;
                    newUser.address=req.body.address;
                    newUser.created_at=Date.now()
                    newUser.save()
                            .then((user)=>{
                                return done(null,user,req.flash('success','User Added'))
                                
                            }).catch((err)=>{
                                return done(null, false, req.flash('error', 'Somthing went wrong'+err));
                
                            });
                }
            })
            .catch((err)=>{
                return done(null, false, req.flash('error', 'Somthing went wrong '+err));

            })
        
    }
}));


//login 
passport.use('local.login',new localStratgy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },(req,username,password,done)=>{
        //find user
        User.findOne({email:username})
        .then((user)=>{
            if(!user){
                return done(null,false,req.flash('error','User Not found !'));
            }
            if(user.comparepassword(password,user.password)){
                return done(null,user,req.flash('success','Wellcome Back !'));
            }else{
                return done(null,flase,req.flash('error','password is Wrong'));
            }

        }).catch((err)=>{
            return done(null,false,req.flash('error','Somthing wrong happened !' ));
        })
    }))