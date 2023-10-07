const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const { localsName } = require('ejs');
const moment = require('moment');
moment().format();


// index 
const index = (req, res) => {
  Event.find({})
    .then((events) => {
      res.render('events/index', {
        events: events,
        message:req.flash('info')
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
// create
const create = (req, res) => {
  res.render('events/create',{
    errors:req.flash('errors')
  });

}

//store
const store = (req, res) => {
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    created_at: Date.now()
  });

  newEvent.save().then(() => {
    req.flash('info','The Event Was Created Successfully !');
    res.redirect('/events');
  }).catch((err) => {
    console.log(err);
  })

}
//show
const show = (req, res) => {
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
}
//edit
const edit = (req, res) => {
  Event.findOne({ _id: req.params.id })
    .then((event) => {
      res.render('events/edit', {
        event: event,
        eventDate:moment(event.date).format('YYYY-MM-DD'),
        errors:req.flash('errors'),
        message:req.flash('info')

      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
}

//update
const update = (req,res)=>{
  // res.json(req.body);

  let fields = {
    title:req.body.title,
    location:req.body.location,
    description:req.body.description,
    date:req.body.date,
  }
  let query={_id:req.body.id};
  Event.findByIdAndUpdate(query,fields)    
    .then((event)=>{
      req.flash('info',"The event Was Updated Successfully");
      res.redirect(`/events/edit/${req.body.id}`);
    }).catch((error)=>{
      req.flash('errors',"Something went wrong");
    })

}

//delete
const destroy = (req,res)=>{
  // res.json(req.params);
  let query=req.params.id;

  Event.findByIdAndDelete(query)
  .then(()=>{
    res.status(200).json('deleted');
    // res.json('success');
    req.flash('info',"The event Was Deleted Successfully");
    // res.redirect(`/events/`);
  }).catch((error)=>{
    res.status(404).json("There was an error ");

    req.flash('errors',"Something went wrong");
  })
}





module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update, 
  destroy
}