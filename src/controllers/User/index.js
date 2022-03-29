const {confirmEmail} = require("./Account/confirmEmail");
const {deleteAccount} = require("./Account/deleteAccount");
const {getStatus} = require("./Account/getStatus");
const {login} = require("./Account/login");
const {setData} = require("./Account/setData");
const {setPass} = require("./Account/setPass");
const {setStatus} = require("./Account/setStatus");
const {signup} = require("./Account/signup");

const {blockUser} = require("./Block/blockUser");
const {listBlocked} = require("./Block/listBlocked");
const {queryBlock} = require("./Block/queryBlock");
const {unblockUser} = require("./Block/unblockUser");

const {followUser} = require("./Followers/followUser");
const {listFollowers} = require("./Followers/listFollowers");
const {queryFollower} = require("./Followers/queryFollower");
const {unfollowUser} = require("./Followers/unfollowUser");

const {countUsers} = require("./Helpers/countUsers");
const {listUsers} = require("./Helpers/listUsers");
const {queryUser} = require("./Helpers/queryUser");






module.exports.confirmEmail = confirmEmail;
module.exports.deleteAccount = deleteAccount;
module.exports.getStatus = getStatus;
module.exports.login = login;
module.exports.setData = setData;
module.exports.setPass = setPass;
module.exports.setStatus = setStatus;
module.exports.signup = signup;
module.exports.blockUser = blockUser;
module.exports.listBlocked = listBlocked;
module.exports.queryBlock = queryBlock;
module.exports.unblockUser = unblockUser;
module.exports.followUser = followUser;
module.exports.listFollowers = listFollowers;
module.exports.queryFollower = queryFollower;
module.exports.unfollowUser = unfollowUser;
module.exports.countUsers = countUsers;
module.exports.listUsers = listUsers;
module.exports.queryUser = queryUser;

