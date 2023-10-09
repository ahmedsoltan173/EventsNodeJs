const { validationResult } = require('express-validator');
const Post = require('../models/posts');
const User = require('../models/User');
const Event = require('../models/Event');
const { localsName } = require('ejs');




const index = (req, res) => {
    Post.find({}).then((posts) => {
        res.json(posts);
    });
}




const create = async (req, res) => {

    const { title, eventOwner, userOwner } = req.body;
    const event = await Event.findById(eventOwner);
    const user = await User.findById(userOwner);
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
     const post= new Post({ title, eventOwner, userOwner });

        // .then((post) => {
        event.posts.push(post);
        user.posts.push(post);
        
        Promise.all([event.save(), user.save(),post.save()]).then((g)=>{

            res.json({ message: 'Post added successfully' });
        }).catch((err)=>{
            res.json(err);
        });

        // res.json(post)

    // }).catch((err) => {
    //     res.json(err)
    // });



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