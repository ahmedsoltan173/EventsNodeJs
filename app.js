const express =require('express');
const app=express();
const db = require('./config/database');
const bodyParser=require('body-parser');
const session = require('express-session');
const flash = require('connect-flash')
const passport =require('passport');
const passportSetup=require('./config/auth');

/********************************************************
 * ************************ bring *********************** 
 ********************************************************/
//bring ejs templete 
app.set('view engine','ejs');
//bring body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//bring static public folder 
app.use(express.static('public'));
// app.use(express.static('config'));
app.use(express.static('node_modules'));
app.use(express.static("."));
//sessions and flash 
app.use(session({
    secret:'error',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60000 * 15}
}))
app.use(flash());

//bring passport auth 
app.use(passport.initialize());
app.use(passport.session());
//store user object 

//middleware
var middlewares =require('./routes/middleWare');
    app.use('*',middlewares);


//events routes 
var events =require('./routes/eventRoutes');
    app.use('/events',events);

//events routes 
var posts =require('./routes/postsRoutes');
    app.use('/posts',posts);

//auth routes 
var auth=require('./routes/authRoutes');
    app.use('/auth',auth);

// user routes
var user=require('./routes/userRoutes');
    app.use('/user',user);





//listen to port 3000
app.listen(8000,()=>{
    console.log("app is working from port 3000");
});
