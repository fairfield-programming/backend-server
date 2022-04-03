const { confirmEmail } = require('./Account/confirmEmail');
const { deleteAccount } = require('./Account/deleteAccount');
const { getStatus } = require('./Account/getStatus');
const { login } = require('./Account/login');
const { setData } = require('./Account/setData');
const { setPass } = require('./Account/setPass');
const { setStatus } = require('./Account/setStatus');
const { signup } = require('./Account/signup');

const { blockUser } = require('./Block/blockUser');
const { listBlocked } = require('./Block/listBlocked');
const { queryBlock } = require('./Block/queryBlock');
const { unblockUser } = require('./Block/unblockUser');

const { followUser } = require('./Followers/followUser');
const { listFollowers } = require('./Followers/listFollowers');
const { queryFollower } = require('./Followers/queryFollower');
const { unfollowUser } = require('./Followers/unfollowUser');

const { countUsers } = require('./Helpers/countUsers');
const { listUsers } = require('./Helpers/listUsers');
const { queryUser } = require('./Helpers/queryUser');

module.exports = {
	confirmEmail,
	deleteAccount,
	getStatus,
	login,
	setData,
	setPass,
	setStatus,
	signup,
	blockUser,
	listBlocked,
	queryBlock,
	unblockUser,
	followUser,
	listFollowers,
	queryFollower,
	unfollowUser,
	countUsers,
	listUsers,
	queryUser,
};
