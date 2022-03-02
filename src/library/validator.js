function propertyUndefined(property)
{
   return property === undefined;
}

function objectIsNull(obj)
{
   return obj === null;
}

function checkIfNumberInRange(num, min, max) {
  return num >= min && num <= max;
}

function invalidPassword(password) {
  return (
    (password.length > 14)    ||
    (password.length < 4)     ||
    (!password.match(/[A-Z]/))||
    (!password.match(/[a-z]/))||
    (!password.match(/\d/))   ||
    (!password.match(/[\\#?!@$%^&*\-_]/))
  );
}

function invalidUsername(username) {
  return (
    (username.length > 30)    ||
    (username.length < 4)     ||
    (username.includes(" "))  ||
    (username.toLowerCase() !== username) ||
    (/\d/.test(username))     ||
    (/[!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(username))
  );
}

function invalidEmail(email) {
  return !(/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email));
}

module.exports = {
    propertyUndefined,
    invalidPassword,
    checkIfNumberInRange,
    objectIsNull,
    invalidUsername,
    invalidEmail,
};