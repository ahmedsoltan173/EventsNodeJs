const { validationResult } = require('express-validator');
const Post = require('../models/posts');
const { localsName } = require('ejs');




const index = (req, res) => {
    Post.find({}).then((posts) => {
        res.json(posts);
    });
}




const create = async (req, res) => {

    const { title, eventOwner, userOwner } = req.body;

    await new Post({ title, eventOwner, userOwner }).save().then((post) => {
        res.json(post)

    }).catch((err) => {
        res.json(err)

    });
}


const show = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
        .populate([
            {
            path: 'eventOwner',
            select: 'title description',
            },{
                path: 'userOwner',
                select: 'name email',
                match:{name:{$regex:'Ahmed'}}

            }
            ])
        .then((post) => {
            res.status(200).json(post);
        }).catch((err) => {
            res.status(404).json("This Post Not Exist ");
        });


}


const userPosts=async(req,res)=>{
    const id=req.params.id;
    const posts=await Post.find({userOwner:id})
    .populate('userOwner')
    .then((posts)=>{
        res.json(posts);
    }).catch((err) => {
        res.status(404).json("This Post Not Exist ");
    });
}



module.exports = {
    index,
    create,
    show,
    userPosts
}