const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/User');
const { verifyLogin } = require('../middelwares/verifyLogin');
const { verifyEmail } = require('../middelwares/verifyEmail');


// Block Endpoints
router.get('/blockedUsers', verifyLogin, userControllers.listBlocked);
router.get('/blockedUsers/:blockedId', verifyLogin, userControllers.queryBlock);

router.post('/:toBlockId/block', verifyLogin, verifyEmail, userControllers.blockUser);
router.post('/:toUnblockId/unblock', verifyLogin, verifyEmail, userControllers.unblockUser);

// Follow Endpoints
router.get('/:id/followers', verifyLogin, verifyEmail, userControllers.listFollowers);
router.get('/:id/followers/:followerId', verifyLogin, verifyEmail, userControllers.queryFollower);
router.get('/followings', verifyLogin, verifyEmail, userControllers.listFollowings)
router.get('/followings/:followingId', verifyLogin, verifyEmail, userControllers.queryFollowing)

router.post('/:toFollowId/follow', verifyLogin, verifyEmail, userControllers.followUser);
router.post('/:followeeId/unfollow', verifyLogin, verifyEmail, userControllers.unfollowUser);



// User Endpoints
router.get('/', userControllers.listUsers);
router.get('/count', userControllers.countUsers);
router.get('/:id/', userControllers.queryUser);
router.get('/:id/status', userControllers.getStatus);


router.post('/signup', userControllers.signup);
router.post('/login', userControllers.login);
router.post('/update', verifyLogin, userControllers.setData);
router.post('/setStatus', verifyLogin, userControllers.setStatus);
router.post('/setPassword', verifyLogin, userControllers.setPass);
router.post('/delete', verifyLogin, userControllers.deleteAccount);


// user posts endpoints

router.get('/:id/posts', userControllers.listAllUserPosts);
router.get('/:id/posts/:postId', userControllers.listOneUserPost)



// email verification end point
router.get('/confirmEmail/:token', userControllers.confirmEmail);

module.exports = router;
