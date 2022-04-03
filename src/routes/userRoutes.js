const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/User');
const { verifyLogin } = require('../middleware/verifyLogin');
const { verifyEmail } = require('../middleware/verifyEmail');

// User Endpoints
router.get('/', userControllers.listUsers);
router.get('/count', userControllers.countUsers);
router.get('/:id/', userControllers.queryUser);
router.get('/:id/status', userControllers.getStatus);

router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.post('/:id/update', verifyLogin, userControllers.setData);
router.post('/:id/status', verifyLogin, userControllers.setStatus);
router.post('/:id/password', verifyLogin, userControllers.setPass);
router.post('/:id/delete', verifyLogin, userControllers.deleteAccount);

// Block Endpoints
router.get('/:id/block', verifyLogin, userControllers.blockUser);
router.get('/:id/block/:blockId/query', verifyLogin, userControllers.queryBlock);

router.post('/:id/block/:blockId/block', verifyLogin, verifyEmail, userControllers.blockUser);
router.post('/:id/block/:blockId/undo', verifyLogin, verifyEmail, userControllers.unblockUser);

// Follow Endpoints
router.get('/:id/followers', verifyLogin, userControllers.listFollowers);
router.get('/:id/followers/:followerId', verifyLogin, userControllers.queryFollower);

router.post('/:id/followers/:followerId/follow', verifyLogin, verifyEmail, userControllers.followUser);
router.post('/:id/followers/:followerId/undo', verifyLogin, verifyEmail, userControllers.unfollowUser);

// email verification end point
router.get('/confirmEmail/:token', userControllers.confirmEmail);

module.exports = router;
