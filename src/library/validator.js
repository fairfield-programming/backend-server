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
  if (username.includes(" ")) return true;
  if (/\d/.test(username)) return true;
  if (/[!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(username)) return true;
  if (username.toLowerCase() !== username) return true;
  return false;
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