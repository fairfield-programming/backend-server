// Check if Undefined
function propertyNotFound(property)
{
    if (typeof property === "undefined") return true;
    if (property == undefined) return true;
    return false;
}

// Check if Object is Null
function objectNotFound(property)
{
    return property == null;
}

// Check if Valid Password
function invalidPassword(password)
{
    if (password.length > 14) return true;
    if (password.length < 4) return true;
    if (!password.match(/[A-Z]/)) return true;
    if (!password.match(/[a-z]/)) return true;
    if (!password.match(/\d/)) return true;
    if (!password.match(/[\\#?!@$%^&*\-_]/)) return true;
    return false;
}

// Check if Valid Username
function invalidUsername(username)
{
    if (username.length > 30) return true;
    if (username.length < 4) return true;
    if (username.includes(" ")) return true;
    if (/\d/g.test(username)) return true;
    if (/[!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g.test(username)) return true;
    if (username.toLowerCase() !== username) return true;
    return false;
}

// Check if Valid Email
function invalidEmail(email)
{
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    return true;
}

// Export Functions
module.exports = {
    propertyNotFound,
    invalidPassword,
    objectNotFound,
    invalidUsername,
    invalidEmail,
};