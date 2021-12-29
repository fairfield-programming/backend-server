// Check if Undefined
function propertyNotFound(property)
{
    if (typeof property === "undefined") return true;
    if (property == undefined) return true;
    return false;
}

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

function invalidEmail(email)
{
    const re1 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)/;
    if (re1.test(email)) return false;
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(\d{1,3}\.){4}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) return true;
    return false;
}

module.exports = {
    notEnoughParametersForSetData,
    notEnoughParametersForSignup,
    propertyNotFound,
    invalidPassword,
    invalidUsername,
    invalidEmail,
};