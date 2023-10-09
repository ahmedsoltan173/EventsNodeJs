const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const { localsName } = require('ejs');
const moment = require('moment');
moment().format();


// index 
const index = (req, res) => {

  //start pagination 
  if (!(req.params.page)) {
    page = 1;
  } else {
    page = parseInt(req.params.page);
  }

  if (req.params.page == 0) {
    page = 1;
  }

  let q = {
    skip: 15 * (page - 1),
    limit: 15
  }
  //find total records
  let total = 0;

  Event.countDocuments({})
    .then((total) => {
      totalDocs = parseInt(total);
      //end pagination 

      Event.find({}, {}, q)
        .then((events) => {
          res.render('events/index', {
            events: events,
            message: req.flash('info'),
            error: req.flash('error'),
            total: parseInt(totalDocs),
            page: page
          })
        })
        .catch((err) => {
          console.log(err)
        })


    }).catch((err) => {
      console.log(err);
    })
}



// create
const create = (req, res) => {
  res.render('events/create', {
    errors: req.flash('errors')
  });

}

//store
const store = (req, res) => {
  let newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    user_id: req.user.id,
    created_at: Date.now()
  });

  newEvent.save().then(() => {
    req.flash('info', 'The Event Was Created Successfully !');
    res.redirect('/events/index');
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
      if (event.user_id != req.user.id) {
        req.flash('error', "This User Can't edit this event!");
        return res.redirect('/events/index');
      }

      res.render('events/edit', {
        event: event,
        eventDate: moment(event.date).format('YYYY-MM-DD'),
        errors: req.flash('errors'),
        message: req.flash('info')
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error' + err);
    });
}
//update
const update = (req, res) => {
  // res.json(req.body);

  let fields = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    date: req.body.date,
  }
  let query = { _id: req.body.id };
  Event.findByIdAndUpdate(query, fields)
    .then((event) => {
      req.flash('info', "The event Was Updated Successfully");
      res.redirect(`/events/edit/${req.body.id}`);
    }).catch((error) => {
      req.flash('errors', "Something went wrong");
    })

}

//delete
const destroy = (req, res) => {
  // res.json(req.params);
  let query = req.params.id;

  Event.findById(query)
    .then((event) => {
      if (event.user_id != req.user.id) {
        req.flash('error', "This User Can't edit this event!");
        res.status(404).json("There was an error ");
      } else {
        event.deleteOne();
        res.status(200).json('deleted');
        // res.json('success');
        req.flash('info', "The event Was Deleted Successfully");
      }
      // res.redirect(`/events/`);
    }).catch((error) => {
      res.status(404).json("There was an error ");

      req.flash('errors', "Something went wrong");
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