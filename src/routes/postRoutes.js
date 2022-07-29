const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/Post');




router.post('/create', postControllers.createPost);

module.exports = router;