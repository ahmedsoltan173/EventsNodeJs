const express =require('express');
const router=express.Router();
const app=express();
const Event=require('../models/Event');


router.get('/',(req,res)=>{
    Event.find({})
        .then((events)=>{
            res.render('events/index',{
                events:events
            })
        })
        .catch((err)=>{
            console.log(err)
        })

});
//create

router.get('/create',(req,res)=>{
    res.render('events/create');
});

router.post('/store',(req,res)=>{
  
    let newEvent=new Event({
        title : req.body.title,
        description : req.body.description,
        location:req.body.location,
        date:req.body.date,
        created_at:Date.now()
    });

    newEvent.save().then(()=>{
        res.redirect('/events');
    }).catch((err)=>{
        console.log(err);
    })

});

//show
router.get('/:id', (req, res) => {
    Event.findOne({ _id: req.params.id })
      .then((event) => {
        res.render('events/show', {
          event: event
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  
});
//edit
router.get('/edit/:id',(req,res)=>{
    Event.findOne({ _id: req.params.id })
      .then((event) => {
        res.render('events/edit', {
          event: event
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
      });
  
});




module.exports=router;

