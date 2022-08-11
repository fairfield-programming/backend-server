const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/Post');


router.get('/', postControllers.getAllPosts)
router.get('/:postId', postControllers.getPost);



router.post('/create', postControllers.createPost);
router.post('/:postId/update', postControllers.updatePost);
router.post('/:postId/delete', postControllers.deletePost);

module.exports = router;