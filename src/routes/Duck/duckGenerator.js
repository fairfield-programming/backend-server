function parseDuckString(input) {

    // Check that the String is Correctly Formatted
    if (input == undefined) return false;
    if (typeof input != 'string') return false;

    // Check if String has Bad Characters
    if (/[g-zG-Z]/g.test(input)) return false;
    if (/[$-/:-?{-~!"^_`\[\]]/g.test(input)) return false;

    // Check Version of Duck String
    if (input.length == 0) return false;
    
    switch(input[0]) {

        case '1':
            return parseDuckV1String(input);
        default:
            return false;

    }

}

function parseDuckV1String(input) {

    // Make Sure Length is Right
    if (input.length != 15) return false;

    // Get Duck Hat
    var hatString = input.substring(1, 3);
    var hat = parseInt(hatString, 16);

    // Get Duck Eyes
    var eyesString = input.substring(3, 5);
    var eyes = parseInt(eyesString, 16);

    // Get Duck Beak
    var beakString = input.substring(5, 7);
    var beak = parseInt(beakString, 16);

    // Get Duck Wings
    var wingString = input.substring(7, 9);
    var wings = parseInt(wingString, 16);

    // Get Duck Smoke
    var smokeString = input.substring(9, 11);
    var smoke = parseInt(smokeString, 16);

    // Get Duck Tail
    var tailString = input.substring(11, 13);
    var tail = parseInt(tailString, 16);

    // Get Beak Color
    var beakString = input.substring(13, 14);
    var beakColor = parseInt(beakString, 16);

    // Get Feather Color
    var featherString = input.substring(14, 15);
    var featherColor = parseInt(featherString, 16);

    // Return the Final Duck Data
    return {
        hat: hat,
        eyes: eyes,
        beak: beak,
        wings: wings,
        smoke: smoke,
        beakColor: beakColor,
        color: featherColor
    };

}

function generateDuck (duckData) {

    var colors = [
        "#000000", // black
        "#FFFFFF", // white
        "#9D8009", // brown
        "#F7D23D", // yellow
        "#4C89E4", // blue
        "#E05050", // red
        "url(#rainbow)", // rainbow
    ];

    var trueDuckData = {
        eyes: duckData.eyes || 0,
        smoke: duckData.smoke || 0,
        color: colors[duckData.color] || colors[3],
        beakColor: colors[duckData.beakColor] || colors[5],
    };

    // Add Duck Background
    var output = [
        `<path d="M108.269 63.2162C88.5016 65.824 90.5809 82.7746 94.0914 90.924C91.7961 89.7016 86.3142 86.8493 82.7497 85.2194C78.294 83.1821 71.813 85.6269 70.5978 86.4419C69.3826 87.2568 65.332 96.6285 67.7624 111.705C70.1927 126.781 81.5345 132.486 88.4206 135.338C95.3066 138.19 110.699 137.783 122.041 130.856C133.383 123.929 132.167 111.297 128.117 106.815C124.876 103.229 124.336 96.3569 124.471 93.3688C127.307 82.2314 128.036 60.6085 108.269 63.2162Z" fill="${trueDuckData.color}" stroke="black"/>`,
    ];

    // Check if Gradient Background
    if (trueDuckData.color === "url(#rainbow)" || trueDuckData.beakColor) { 

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

    // Add Smoke 
    switch (trueDuckData.smoke) {

        case 0:
            break;

        case 1: 

            output.push(`<path d="M137.087 90.3564L126.838 93.0423L126.415 91.519L136.663 88.833L138 88.5627L139.5 90.0627L142.5 105.563L141 106.063L138 91.0627L137.087 90.3564Z" fill="white" stroke="black"/>`); 
            output.push(`<path d="M144 96.5627L136.5 98.0627L138.5 113.063L145.5 112.563L144 96.5627Z" stroke="black" stroke-miterlimit="16"/>`);
            output.push(`<path d="M144.5 103.063L137.367 104.563L138.5 113.063L145.5 112.563L144.5 103.063Z" fill="#4C89E4" stroke="black" stroke-miterlimit="16"/>`);

            break;

        case 2:

            output.push(`<path d="M139.738 83.1243C139.816 84.0838 142.17 85.3449 143.337 85.8556C143.92 84.7227 144.95 82.2585 144.405 81.465C143.724 80.473 142.265 80.0661 142.071 82.2946C140.515 80.6883 139.64 81.9249 139.738 83.1243Z" fill="#E05050" stroke="black" stroke-miterlimit="2.9238"/>`);
            output.push(`<path d="M149.937 73.6679C149.132 74.8052 150.571 78.3925 151.392 80.0441C153.092 79.3291 156.525 77.5523 156.658 76.1653C156.824 74.4316 155.583 72.6239 153.297 74.9166C153.063 71.6874 150.943 72.2463 149.937 73.6679Z" fill="#E05050" stroke="black" stroke-miterlimit="2.9238"/>`);
            output.push(`<path d="M137.102 65.6581C137.432 67.6607 142.596 69.9048 145.137 70.7765C146.167 68.2955 147.906 62.94 146.624 61.3665C145.021 59.3996 141.885 58.7961 141.863 63.5123C138.315 60.4054 136.69 63.1547 137.102 65.6581Z" fill="#E05050" stroke="black" stroke-miterlimit="2.9238"/>`);

            break;

        case 3:

            output.push(`<path d="M139.738 83.1243C139.816 84.0838 142.17 85.3449 143.337 85.8556C143.92 84.7227 144.95 82.2585 144.405 81.465C143.724 80.473 142.265 80.0661 142.071 82.2946C140.515 80.6883 139.64 81.9249 139.738 83.1243Z" fill="#4C89E4" stroke="black" stroke-miterlimit="2.9238"/>`);
            output.push(`<path d="M149.937 73.6679C149.132 74.8052 150.571 78.3925 151.392 80.0441C153.092 79.3291 156.525 77.5523 156.658 76.1653C156.824 74.4316 155.583 72.6239 153.297 74.9166C153.063 71.6874 150.943 72.2463 149.937 73.6679Z" fill="#4C89E4" stroke="black" stroke-miterlimit="2.9238"/>`);
            output.push(`<path d="M137.102 65.6581C137.432 67.6607 142.596 69.9048 145.137 70.7765C146.167 68.2955 147.906 62.94 146.624 61.3665C145.021 59.3996 141.885 58.7961 141.863 63.5123C138.315 60.4054 136.69 63.1547 137.102 65.6581Z" fill="#4C89E4" stroke="black" stroke-miterlimit="2.9238"/>`);

            break;

    }

    // Add Eyes
    switch (trueDuckData.eyes) {

        case 0:

            output.push(`<ellipse cx="114.5" cy="82.5" rx="3.5" ry="5.5" fill="white"/>`);
            output.push(`<ellipse cx="123.5" cy="79" rx="2.5" ry="4" fill="white"/>`);
            output.push(`<path d="M115.316 80.5C116.073 81.5182 113.75 82.0151 114.022 84M124.803 77C125.534 78.0956 123.998 78.558 123.941 80.5" stroke="black"/>`);
        
            break;

        case 1:

            output.push(`<path d="M121 87.5L109.952 90L109.5 83.5L97.5 78L97 82L95 79.5L97 76L109.952 80.5L131 75L130.5 84.5L126 83.5L124.5 80.5L121 82V87.5Z" fill="black"/>`);
            output.push(`<path d="M109.952 80.5L131 75L130.5 84.5L126 83.5L124.5 80.5L121 82V87.5L109.952 90L109.5 83.5M109.952 80.5L97 76L95 79.5L97 82L97.5 78L109.5 83.5M109.952 80.5L109.5 83.5" stroke="black"/>`);

            break;

        case 2:

            output.push(`<ellipse cx="114.5" cy="82.5" rx="3.5" ry="5.5" fill="white"/>`);
            output.push(`<ellipse cx="123.5" cy="79" rx="2.5" ry="4" fill="white"/>`);
            output.push(`<path d="M115.316 80.5C116.073 81.5182 113.75 82.0151 114.022 84M124.803 77C125.534 78.0956 123.998 78.558 123.941 80.5" stroke="black"/>`);
            output.push(`<path d="M110.5 77L109.5 74M112.5 76V73.5M115.5 76L116 73.5M121 75.5L119.5 73.5M122.5 74.5L122 72.5M124.5 74.5L125 72.5" stroke="black" stroke-miterlimit="2.9238"/>`);

            break;

        case 3:

            output.push(`<ellipse cx="114.5" cy="82.5" rx="3.5" ry="5.5" fill="white"/>`);
            output.push(`<ellipse cx="123.5" cy="79" rx="2.5" ry="4" fill="white"/>`);
            output.push(`<path d="M115.316 80.5C116.073 81.5182 113.75 82.0151 114.022 84M124.803 77C125.534 78.0956 123.998 78.558 123.941 80.5" stroke="black"/>`);
            output.push(`<path d="M119.5 78L110.5 77.5L110 75L119.5 76L124 72L124.5 74.5L119.5 78Z" fill="black" stroke="black" stroke-miterlimit="2.9238"/>`);

            break;

    }
    
    // Add Beak
    output.push(`<path d="M124.187 83.3262C120.512 81.354 117.645 88.8045 115 92.7763C119.037 96.3372 126.108 99.1037 130.451 94.8307C134.793 90.5576 127.388 93.2817 125.022 92.3654C126.201 92.2563 129.996 89.7431 131.286 89.4893C135.462 88.6676 133.791 84.148 132.956 84.5589C132.121 84.9697 128.78 85.7915 124.187 83.3262Z" fill="${trueDuckData.beakColor}"/>`);
    output.push(`<path d="M120.846 91.1328C121.135 91.4168 122.384 92.6097 125.022 92.3654M125.022 92.3654C126.201 92.2563 129.996 89.7431 131.286 89.4893C135.462 88.6676 133.791 84.148 132.956 84.5589C132.121 84.9697 128.78 85.7915 124.187 83.3262C120.512 81.354 117.645 88.8045 115 92.7763C119.037 96.3372 126.108 99.1037 130.451 94.8307C134.793 90.5576 127.388 93.2817 125.022 92.3654Z" stroke="black"/>`);

    // Add Wing
    output.push(`<path d="M85.8869 107.197C99.2754 105.536 100.718 113.707 99.7652 118L76.4987 115.507C71.6004 100.965 80.1723 98.8878 81.3969 102.627C82.3765 105.619 84.7984 106.92 85.8869 107.197Z" fill="${trueDuckData.color}"/>`);
    output.push(`<path d="M99.7652 118C100.718 113.707 99.2754 105.536 85.8869 107.197C84.7984 106.92 82.3765 105.619 81.3969 102.627C80.1723 98.8878 71.6004 100.965 76.4987 115.507" stroke="black"/>`);

    return output.join("\n");

} 

function formatSVG(data, zoom) {

    if (data == undefined) return `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>`;
    if (zoom == undefined) return `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">\n${data}\n</svg>`;

    var size = 200 - zoom * 2; 

    return `<svg width="${size}" height="${size}" viewBox="${zoom} ${zoom} ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${data}\n</svg>`;

}

module.exports = { generateDuck, parseDuckString, formatSVG };