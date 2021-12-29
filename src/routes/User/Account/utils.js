function propertyNotFound(property) {
	return (property == undefined);
}

function notEnoughParametersForSignup(req) {
	const password = req.body.password;
	const email = req.body.email;
	const username = req.body.username;
	return (propertyNotFound(password) && propertyNotFound(email) && propertyNotFound(username));
}

function notEnoughParametersForSetData(req) {
	const biography = req.body.biography;
	const profilePicture = req.body.profilePicture;
	const username = req.body.username;
	return (propertyNotFound(biography) && propertyNotFound(profilePicture) && propertyNotFound(username));
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

module.exports = { notEnoughParametersForSetData,
									 notEnoughParametersForSignup,
									 invalidPassword,
									 invalidUsername,
									 invalidEmail	};