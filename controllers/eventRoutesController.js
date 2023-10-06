const { validationResult } = require('express-validator');
const Event = require('../models/Event');


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
        event: event
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
}

//update
const update = (req,res)=>{

  res.status(500).send('Internal Server Error');

}

//delete
// const delete = (req,res)=>{

// }





module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update, 
  // delete
}