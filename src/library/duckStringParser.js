function getObject(input, start, end) {
   const itemString = input.substring(start, end);
   return parseInt(itemString, 16); 
}

function getHat(input) {
    return getObject(input, 1, 3);
}

function getEyes(input) {
    return getObject(input, 3, 5);
}

function getBeak(input) {
    return getObject(input, 5, 7);
}

function getWings(input) {
    return getObject(input, 7, 9);
}

function getSmoke(input) {
    return getObject(input, 9, 11);
}

function getTail(input) {
    return getObject(input, 11, 13);
}

function getItem(input) {
    return getObject(input, 13, 15);
}

function getBeakColor(input) {
    return getObject(input, 15, 16);
}

function getFeatherColor(input) {
    return getObject(input, 16, 17);
}

function getData(input) {
    if(stringNotValid(input)) return null;

    const hat = getHat(input);
    const eyes = getEyes(input);
    const beak = getBeak(input);
    const wings = getWings(input);
    const smoke = getSmoke(input);
    const tail = getTail(input);
    const item = getItem(input);
    const beakColor = getBeakColor(input);
    const featherColor = getFeatherColor(input);

    return { hat,
            eyes,
            beak,
            wings,
            smoke,
            tail,
            item,
            beakColor,
            featherColor};
}

function stringNotValid(input) {
    if (notString(input)) return true;
    if (hasBadCharacters(input)) return true;
    // Check Version of Duck String
    if (lengthIs0(input)) return true;
    if (input[0] === "1" && lengthIsCorrect(input)) return false;
    return true;
}

function lengthIsCorrect(input)
{
    return input.length !== 17 ? false : true;
}

function notString(input)
{
    if (!input) return true;
    if (typeof input !== "string") return true;
    return false;
}

function hasBadCharacters(input)
{
    if (/[g-zG-Z]/g.test(input)) return true;
    if (/[$-/:-?{-~!"^_`\[\]]/g.test(input)) return true;
    return false;
}

function lengthIs0(input)
{
    return input.length === 0 ? true : false;
}
module.exports = { getData };