
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/U");

// User Endpoints
router.get('/:username/', userControllers.queryUser);
router.get('/:username/status', userControllers.getStatus);



module.exports = router;