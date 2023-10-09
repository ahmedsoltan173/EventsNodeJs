const express =require('express');
const cors=require('cors');
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



//middleware
const corsOption = {origin: ['http://localhost:8000'],};
var middlewares =require('./routes/middleWare');
    app.use(cors(corsOption));
    app.use('*',middlewares);







var events =require('./routes/eventRoutes');
var posts =require('./routes/postsRoutes');
var auth=require('./routes/authRoutes');
var user=require('./routes/userRoutes');    

    app.use('/events',events); 
    app.use('/posts',posts);
    app.use('/auth',auth);
    app.use('/user',user);





//listen to port 8000
app.listen(8000,()=>{
    console.log("app is working from port 3000");
});
