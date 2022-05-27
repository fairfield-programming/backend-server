const express = require('express');
const router = express.Router();
const eventControllers = require('../controllers/Events');
const { verifyLogin } = require('../middelwares/verifyLogin');
const { verifyEmail } = require('../middelwares/verifyEmail');


router.get('/', verifyLogin, eventControllers.listEvents);
router.get('/:id', verifyLogin, eventControllers.queryEvent);


router.post('/create', verifyLogin, verifyEmail, eventControllers.createEvent);
router.post('/:id/delete', verifyLogin, verifyEmail, eventControllers.deleteEvent);
router.post('/:id/edit', verifyLogin, verifyEmail, eventControllers.editEvent);
router.post('/:id/rsvp', verifyLogin, verifyEmail, eventControllers.rsvpEvent);
router.post('/:id/unrsvp', verifyLogin, verifyEmail, eventControllers.unrsvpEvent);

module.exports = router;
