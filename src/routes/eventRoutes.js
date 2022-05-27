const express = require('express');
const router = express.Router();
const eventControllers = require('../controllers/Events');
const { verifyLogin } = require('../middelwares/verifyLogin');
const { verifyEmail } = require('../middelwares/verifyEmail');


router.get('/', eventControllers.listEvents);
router.get('/:id', eventControllers.queryEvent);

// verifyLogin, verifyEmail,

router.post('/create', eventControllers.createEvent);
router.post('/:id/delete', eventControllers.deleteEvent);
router.post('/:id/edit', eventControllers.editEvent);
router.post('/:id/rsvp', eventControllers.rsvpEvent);
router.post('/:id/unrsvp', eventControllers.unrsvpEvent);

module.exports = router;
