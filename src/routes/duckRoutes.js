const express = require(express);
const router = express.Router();
const duckControllers = require("../controllers/Duck");

router.get("/", duckControllers.getDuck);
router.get("/:id", duckControllers.getDuckById);
router.get("/:id/zoom", duckControllers.getZoomedDuck);

module.exports = router;
