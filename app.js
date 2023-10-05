const express =require('express');
const app=express();
const db = require('./config/database');
const bodyParser=require('body-parser');
// const moment = require('moment');

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




//events routes 
var events =require('./routes/event-routes');
    app.use('/events',events);





//listen to port 3000
app.listen(8000,()=>{
    console.log("app is working from port 3000");
});
