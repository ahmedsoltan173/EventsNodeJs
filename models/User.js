const mongoose=require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true
    },
    posts: [{
        type: ObjectId,
        ref: 'Post',
      }],
      events: [{
        type: ObjectId,
        ref: 'Event',
      }],
})
//to hash password 
userSchema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

//to compare password and hash 
userSchema.methods.comparepassword = (password,hash)=>{
    return bcrypt.compareSync(password,hash)
}

let User=mongoose.model('User',userSchema,'users');
module.exports=User;