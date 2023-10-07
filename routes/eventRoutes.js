const express = require('express');
const router = express.Router();
const app = express();
const eventController = require('../controllers/eventsController');
const {
    validateEvent
} = require('../validations/eventValidation');

const {
    UpdateEventValidation,
} = require('../validations/UpdateEventValidation');

//index
router.get('/', eventController.index);     
//create
router.get('/create', eventController.create);
//store
router.post('/store', validateEvent, eventController.store);
//show
router.get('/:id', eventController.show);
//edit
router.get('/edit/:id', eventController.edit);
//update
router.post('/update' ,UpdateEventValidation,eventController.update);
//destroy
router.delete('/delete/:id', eventController.destroy);




module.exports = router;

