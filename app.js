const express =require('express');
const app=express();
const db = require('./config/database');
const bodyParser=require('body-parser');
// const moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash')

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


//events routes 
var events =require('./routes/event-routes');
    app.use('/events',events);





//listen to port 3000
app.listen(8000,()=>{
    console.log("app is working from port 3000");
});
