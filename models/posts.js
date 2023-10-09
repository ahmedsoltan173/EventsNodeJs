const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    eventOwner:{
        type:ObjectId,
        ref:'Event'
    },
    userOwner:{
        type:ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})




let Post =mongoose.model('Post',postSchema,'posts');
module.exports=Post;
