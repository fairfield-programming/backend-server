const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/User');
const { verifyLogin } = require('../middelwares/verifyLogin');
const { verifyEmail } = require('../middelwares/verifyEmail');

// User Endpoints
router.get('/', userControllers.listUsers);
router.get('/count', userControllers.countUsers);


router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.post('/update', verifyLogin, userControllers.setData);
router.post('/setStatus', verifyLogin, userControllers.setStatus);
router.post('/setPassword', verifyLogin, userControllers.setPass);
router.post('/delete', verifyLogin, userControllers.deleteAccount);

// Block Endpoints
router.get('/blockedUsers', verifyLogin, userControllers.listBlocked);
router.get('/blockedUsers/:blockedId', verifyLogin, userControllers.queryBlock);


// User endpoints - 
// Note: since id can be anything the get by id route sould be last to be invoked.

router.get('/:id/', userControllers.queryUser);
router.get('/:id/status', userControllers.getStatus);


router.post('/:toBlockId/block', verifyLogin, verifyEmail, userControllers.blockUser);
router.post('/:toUnblockId/unblock', verifyLogin, verifyEmail, userControllers.unblockUser);

// Follow Endpoints
router.get('/:id/followers', verifyLogin, userControllers.listFollowers);
router.get('/:id/followers/:followerId', verifyLogin, userControllers.queryFollower);

router.post('/:toFollowId/follow', verifyLogin, verifyEmail, userControllers.followUser);
router.post('/:followeeId/unfollow', verifyLogin, verifyEmail, userControllers.unfollowUser);

// email verification end point
router.get('/confirmEmail/:token', userControllers.confirmEmail);

module.exports = router;
