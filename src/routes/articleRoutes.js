const express = require(express);
const router = express.Router();
const articleControllers = require("../controllers/Article");


router.get('/', articleControllers.getAllArticles);
router.get('/create', articleControllers.createArticle);
router.get('/:id', articleControllers.queryArticle);


module.exports = router;
