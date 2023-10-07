// const { check, validationResult } = require('express-validator');

// exports.validateEvent = [
//     check('title').isLength({ min: 5 }).withMessage('Title Should More than 5 char').notEmpty().withMessage('Title Is Required'),
//     check('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
//     check('location').isLength({ min: 5 }).withMessage('Location must be at least 5 characters long'),
//     check('date').notEmpty().withMessage('Date is Required'),


//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()){
//             // return res.json(req.path);
//             req.flash('errors',errors.array());
            // return res.json(errors)

//                 return res.redirect('/events/create')
//         }

//         next();
//     },
// ];