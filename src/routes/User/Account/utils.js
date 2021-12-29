function noBiography(biography) {
	return (biography == undefined);
}

function noProfilePicture(profilePicture) {
	return (profilePicture == undefined);
}

function noUsername(username) {
	return (username == undefined);
}

function notEnoughParameters(req) {
	const biography = req.body.biography;
	const profilePicture = req.body.profilePicture;
	const username = req.body.username;
	return (noBiography(biography) && noProfilePicture(profilePicture) && noUsername(username));
}

function invalidPassword(password) {
	if (password.length > 14) return true;
	if (password.length < 4) return true;
	if (!password.match(/[A-Z]/)) return true;
	if (!password.match(/[a-z]/)) return true;
	if (!password.match(/\d/)) return true;
	if (!password.match(/[\\#?!@$%^&*\-_]/)) return true;
	return false;
}

function invalidUsername(username) {
	if (username.length > 30) return true;
	if (username.length < 4) return true;
	if (username.includes(' ')) return true;
	if (/\d/g.test(username)) return true;
	if (/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g.test(username)) return true;
	if (username.toLowerCase() !== username) return true;
	return false;
}

function invalidEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(email)) return true;
	return false;
}

module.exports = { notEnoughParameters,
									 invalidPassword,
									 invalidUsername,
									 invalidEmail	};