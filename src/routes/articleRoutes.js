const express = require('express');
const router = express.Router();
const articleControllers = require('../controllers/Article');
const { verifyLogin } = require('../middelwares/verifyLogin');
const { verifyEmail } = require('../middelwares/verifyEmail');

router.get('/', articleControllers.getAllArticles);
router.get('/create', verifyLogin, verifyEmail, articleControllers.createArticle);
router.get('/:id', articleControllers.queryArticle);

module.exports = router;
