const express = require('express');
const router = express.Router();
const app = express();
const postController = require('../controllers/postsController');


router.get('/index',postController.index);
router.get('/show/:id',postController.show);
router.get('/user/:id',postController.userPosts);

router.post('/create',postController.create);


module.exports = router;            

