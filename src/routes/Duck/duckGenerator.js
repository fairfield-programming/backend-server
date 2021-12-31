const fs = require("fs");
const path = require("path");
const { gradientBackground } = require("../../library/duckGeneratorUtils");

function getItemString(type, number)
{
    // Get the File Path
    const itemPath = path.join(
        __dirname,
        "../../../",
        "ducks/",
        type,
        `/${number}.svg`
    );

    // Check if File Exists
    if (!fs.existsSync(itemPath)) return [];

    // Get the File Data
    const itemData = fs.readFileSync(itemPath, "ascii");
    const strippedData = stripSVGData(itemData);

    // Break Each Line
    return strippedData.split("\n");
}

function stripSVGData(input)
{
    let output = input.replace(/<svg[ -\=\?-\~\n]*>/g, "");
    output = output.replace(/<\/svg>/g, "");
    return output.trim();
}

function generateDuck(duckData)
{
    const colors = [
        "#000000", // black
        "#FFFFFF", // white
        "#9D8009", // brown
        "#F7D23D", // yellow
        "#4C89E4", // blue
        "#E05050", // red
        "url(#rainbow)", // rainbow
    ];

    const trueDuckData = {
        hat: duckData.hat || 0,
        eyes: duckData.eyes || 0,
        beak: duckData.beak || 0,
        wings: duckData.wings || 0,
        smoke: duckData.smoke || 0,
        tail: duckData.tail || 0,
        item: duckData.item || 0,
        color: colors[duckData.color] || colors[3],
        beakColor: colors[duckData.beakColor] || colors[5],
    };

    // Create the Base Data
    let output = [];

    // Add the Body (Spread it First)
    output.push(...getItemString("body", trueDuckData.tail));

    if (gradientBackground(trueDuckData))
    {
        output.push(`<defs>
            <linearGradient id="rainbow" gradientTransform="translate(0.2, 0), rotate(20)">
                <stop offset="0"     stop-color="#FF0018"/>
                <stop offset="0.166" stop-color="#FF0018"/>
                <stop offset="0.166" stop-color="#FFA52C"/>
                <stop offset="0.333" stop-color="#FFA52C"/>
                <stop offset="0.333"   stop-color="#FFFF41"/>
                <stop offset="0.5" stop-color="#FFFF41"/>
                <stop offset="0.5" stop-color="#008018"/>
                <stop offset="0.666" stop-color="#008018"/>
                <stop offset="0.666" stop-color="#0000F9"/>
                <stop offset="0.833" stop-color="#0000F9"/>
                <stop offset="0.833" stop-color="#86007D"/>
            </linearGradient>
        </defs>`);
    }

    // Add the Smoke (Spread it First)
    output.push(...getItemString("smoke", trueDuckData.smoke));

    // Add the Eyes (Spread it First)
    output.push(...getItemString("eyes", trueDuckData.eyes));

    // Add the Beak (Spread it First)
    output.push(...getItemString("beak", trueDuckData.beak));

    // Add the Items (Spread it First)
    output.push(...getItemString("items", trueDuckData.items));

    // Add the Wings (Spread it First)
    output.push(...getItemString("wing", trueDuckData.wings));

    // Add the Hat (Spread it First)
    output.push(...getItemString("hat", trueDuckData.hat));

    // Create Some Output Text
    let outputText = output.join("\n");

    // Replace the Text with Color
    outputText = outputText.replace(/DUCK_COLOR/g, trueDuckData.color);
    outputText = outputText.replace(/BEAK_COLOR/g, trueDuckData.beakColor);

    // Return the Output Text
    return outputText;
}

function formatSVG(data, zoom)
{
    if (!data)
        return `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;
    if (!zoom)
        return `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">\n${data}\n</svg>`;

    const size = 200 - zoom * 2;

    return `<svg width="${size}" height="${size}" viewBox="${zoom} ${zoom} ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${data}\n</svg>`;
}

module.exports = {
    generateDuck,
    formatSVG,
};
