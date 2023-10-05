const db=require('../config/database');
const Event=require('../models/Event');

let newEvent=[
    new Event({
        title:'This is event 1',
        description:"this is the first description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 2',
        description:"this is the second description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 3',
        description:"this is the third description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 4',
        description:"this is the four description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 5',
        description:"this is the five description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 6',
        description:"this is the six description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 7',
        description:"this is the seven description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 8',
        description:"this is the eight description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
    new Event({
        title:'This is event 9',
        description:"this is the night description ",
        date:Date.now(),
        location:'Egypt',
        created_at:Date.now(),    
    }),
]


newEvent.forEach((event)=>{
    event.save()
    .then(()=>{
        console.log('Done');
    })
    .catch((err)=>{
        console.log(err);
    })
})



// let newEvent=new Event({
//     title:'This is event 1',
//     description:"this is the first description ",
//     date:Date.now(),
//     location:'Egypt',
//     created_at:Date.now(),

// });

// newEvent.save()
//     .then(() => {
//         console.log('record has added');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

